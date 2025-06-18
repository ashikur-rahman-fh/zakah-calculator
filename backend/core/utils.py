import calendar

def month_to_index(month_str: str) -> int:
    month_str = month_str.strip().lower()

    full_names = {name.lower(): idx for idx, name in enumerate(calendar.month_name) if name}
    abbr_names = {name.lower(): idx for idx, name in enumerate(calendar.month_abbr) if name}

    if month_str in full_names:
        return full_names[month_str]
    if month_str in abbr_names:
        return abbr_names[month_str]

    raise ValueError(f"Invalid month: {month_str}")

def index_to_month(month_index: int):
    if month_index < 1 or month_index > 12:
        raise ValueError(f"Invalid month index: {month_index}")

    return calendar.month_name[month_index]
