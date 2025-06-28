from .models import ZakahCalculation, ZakahTransaction, Asset


class ZakahService:
    @staticmethod
    def get_all_zakah_calculations():
        # Prefetch related transactions to avoid N+1 queries
        return ZakahCalculation.objects.prefetch_related('transactions').all()


class TransactionService:
    @staticmethod
    def get_transactions_by_year(year: int):
        return ZakahTransaction.objects.select_related('zakah').filter(zakah__year=year)

class AssetService:
    @staticmethod
    def get_all_assets():
        return Asset.objects.all()
