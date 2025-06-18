import uuid
from datetime import date
from django.db import models
from django.core.exceptions import ValidationError
from django.core.validators import MinValueValidator, MaxValueValidator


class ZakahCalculation(models.Model):
    """
    Represents a single zakah calculation for a specific month and year.

    Tracks:
    - The total zakah amount.
    - A detailed JSON breakdown of assets used to calculate zakah.
    - The timestamp of calculation.
    """
    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False,
        db_index=True,
        help_text="Primary key for ZakahCalculation, generated as a UUID."
    )
    year = models.PositiveIntegerField(
        validators=[MinValueValidator(1999), MaxValueValidator(2999)],
        help_text="The calendar year the zakah calculation is associated with."
    )
    month = models.PositiveSmallIntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(12)],
        help_text="The calendar month of the zakah calculation (1-12)."
    )
    total_amount = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        validators=[MinValueValidator(0.01)],
        help_text="The total zakah amount calculated for the specified month and year."
    )
    calculation_breakdown = models.JSONField(
        help_text="A structured JSON object detailing asset categories and their values, e.g., {'stocks': 5000, 'savings': 2000}."
    )
    calculated_at = models.DateTimeField(
        auto_now_add=True,
        help_text="Timestamp of when the zakah was calculated and stored."
    )

    class Meta:
        db_table = "zakah_calculation"
        verbose_name = "Zakah Calculation"
        verbose_name_plural = "Zakah Calculations"
        unique_together = ("year", "month")
        ordering = ["-year", "-month"]
        indexes = [
            models.Index(fields=["year", "month"]),
        ]

    def __str__(self):
        return f"Zakah {self.year}-{self.month:02d}: ${self.total_amount}"


class ZakahTransaction(models.Model):
    """
    Represents a single zakah payment transaction tied to a specific zakah calculation.

    Enforces:
    - Amount must be positive.
    - Date cannot be in the future.
    - Total payments must not exceed calculated zakah.
    """
    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False,
        db_index=True,
        help_text="Primary key for ZakahTransaction, generated as a UUID."
    )
    zakah = models.ForeignKey(
        ZakahCalculation,
        on_delete=models.CASCADE,
        related_name="transactions",
        help_text="Reference to the associated zakah calculation instance."
    )
    amount = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        validators=[MinValueValidator(0.01)],
        help_text="The monetary amount paid in this zakah transaction."
    )
    paid_to = models.CharField(
        max_length=255,
        help_text="The recipient or organization to which this zakah was paid."
    )
    payment_method = models.CharField(
        max_length=127,
        help_text="The payment method used to pay the zakah"
    )
    payment_date = models.DateField(
        auto_created=True,
        help_text="The exact date on which the zakah payment was made."
    )
    description = models.TextField(
        blank=True,
        null=True,
        help_text="Optional notes or comments related to the transaction (e.g., method of payment, purpose)."
    )

    class Meta:
        db_table = "zakah_transaction"
        verbose_name = "Zakah Transaction"
        verbose_name_plural = "Zakah Transactions"
        ordering = ["-payment_date"]
        indexes = [
            models.Index(fields=["payment_date"]),
            models.Index(fields=["paid_to"]),
        ]

    def __str__(self):
        return f"${self.amount:.2f} paid to {self.paid_to} on {self.payment_date.isoformat()}"

    def clean(self):
        if self.amount <= 0:
            raise ValidationError("Transaction amount must be greater than zero.")

        if self.payment_date > date.today():
            raise ValidationError("Payment date cannot be in the future.")

    def save(self, *args, **kwargs):
        self.full_clean()  # Enforce all validations before saving
        super().save(*args, **kwargs)
