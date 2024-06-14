
import logging
from django.utils import timezone

logger = logging.getLogger(__name__)

class LogIPMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        ip_address = request.META.get('REMOTE_ADDR')
        user_agent = request.META.get('HTTP_USER_AGENT')
        timestamp = timezone.now()

        logger.info(f"IP: {ip_address}, User-Agent: {user_agent}, Timestamp: {timestamp}")
        print(f"IP: {ip_address}, User-Agent: {user_agent}, Timestamp: {timestamp}")

        response = self.get_response(request)
        return response