export enum GpuStatusEnum {
    AVAILABLE = "available",
    UNAVAILABLE = "unavailable",
    ERROR = "error"
}

export enum GpuActivityStatusEnum {
    BOOKED = "booked",
    SELF_CANCEL = "cancel_by_user",
    ADMIN_CANCEL = "cancel_by_admin"
}