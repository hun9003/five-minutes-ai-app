interface TossUserInfo {
  userKey: number;
  name: string;
  phone?: string;
}

/**
 * 토스 authorizationCode를 백엔드로 전송하여 사용자 정보를 조회합니다.
 *
 * @param authorizationCode - 토스 appLogin에서 받은 인가 코드
 * @param referrer - 토스 appLogin에서 받은 referrer 정보
 * @returns 사용자 정보
 */
export async function getTossUserInfo(
  authorizationCode: string,
  referrer?: string
): Promise<TossUserInfo> {
  try {
    // TODO: 실제 백엔드 API 엔드포인트로 교체 필요
    const response = await fetch('/api/auth/toss/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        authorizationCode,
        referrer,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user info from backend');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching Toss user info:', error);
    throw error;
  }
}

/**
 * 백엔드 API 예시 응답 형식:
 *
 * POST /api/auth/toss/user
 * Request Body:
 * {
 *   "authorizationCode": "auth_code_from_toss",
 *   "referrer": "referrer_info"
 * }
 *
 * Response:
 * {
 *   "userKey": 12345,
 *   "name": "홍길동",
 *   "phone": "010-1234-5678"
 * }
 *
 * 백엔드에서는:
 * 1. authorizationCode를 토스 서버로 전송
 * 2. 토스로부터 사용자 정보 수신
 * 3. 자체 DB에 사용자 정보 저장/업데이트
 * 4. 클라이언트에 사용자 정보 반환
 */
