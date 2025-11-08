/**
 * ID chung cho các tác vụ hệ thống.
 * Xử lý các tác vụ nền, quan trọng, không định kỳ.
 * Không phải do người dùng kích hoạt trực tiếp.
 */
export const SYSTEM_USER_ID = '00000000-0000-0000-0000-000000000001';

/**
 * ID riêng cho tác vụ định kỳ.
 * Xử lý các tác vụ định kỳ, theo lịch.
 * Không phải User ID (cần System ID).
 */
export const CRONJOB_USER_ID = '00000000-0000-0000-0000-000000000002';

/**
 * ID cho tác vụ xử lý hàng đợi.
 * Xử lý các tác vụ không đồng bộ, thường là do HTTP_API ủy thác.
 */
export const MESSAGE_QUEUE_LISTENER_ID = '00000000-0000-0000-0000-000000000003';

/**
 * ID cho user chưa đăng nhập
 * Thường là các user anonymous truy cập các thông tin public
 */
export const GUEST_USER_ID = '00000000-0000-0000-0000-000000000004';
