# 🏙️ Live Data City - 실시간 주식 3D 시각화

실시간 국내 주식 데이터를 3D 가상 도시로 시각화하여, 주식 시장의 동향을 직관적이고 임팩트 있게 표현하는 웹 애플리케이션입니다.

## ✨ 주요 특징

- **실시간 주식 데이터**: 국내 주요 종목의 실시간 가격 변동
- **3D 도시 시각화**: 주식 데이터를 건물 높이, 조명, 색상으로 표현
- **와우 모먼트**: 급등락 시 도시 전체 네온 효과
- **PWA 지원**: 모바일 웹앱으로 사용 가능
- **반응형 디자인**: 데스크톱과 모바일 모두 지원

## 🚀 빠른 시작

### 1. 의존성 설치

### 🎮 인터랙티브 기능
- **건물 클릭**: 상세 주식 정보 모달 표시
- **3D 네비게이션**: 마우스로 회전, 줌, 팬 조작
- **실시간 업데이트**: WebSocket을 통한 실시간 데이터 반영

## 🏗️ 아키텍처

### 📁 프로젝트 구조
```
DataVille/
├── app/                          # Next.js App Router
│   ├── globals.css              # 전역 스타일
│   ├── layout.tsx               # 루트 레이아웃
│   └── page.tsx                 # 메인 페이지
├── components/
│   ├── city/                    # 3D 도시 컴포넌트
│   │   ├── AllBuildingTypes.tsx # 모든 건물 타입 정의
│   │   ├── Building.tsx         # 개별 건물 컴포넌트
│   │   ├── BuildingTypes.tsx    # 특정 건물 스타일
│   │   ├── City.tsx             # 3D 캔버스 래퍼
│   │   ├── CityAnimations.tsx   # 동적 요소 (차량, 비행기, 구름)
│   │   ├── CityEnvironment.tsx  # 도시 환경 (도로, 공원)
│   │   └── CityScene.tsx        # 메인 3D 씬
│   └── ui/                      # UI 컴포넌트
│       ├── ControlPanel.tsx     # 제어판
│       ├── GlobalStockModal.tsx # 주식 상세 모달
│       └── LoadingScreen.tsx    # 로딩 화면
├── hooks/
│   └── useStockWebSocket.ts     # WebSocket 훅
├── shared/
│   ├── constants/
│   │   └── stocks.ts            # 주식 상수 및 설정
│   └── types/
│       └── stock.ts             # TypeScript 타입 정의
├── stores/
│   └── stockStore.ts            # Zustand 상태 관리
└── utils/
    ├── cityLayout.ts            # 도시 레이아웃 유틸리티
    ├── stableCityLayout.ts      # 안정적인 건물 배치
    └── stockData.ts             # 주식 데이터 처리
```
│   └── constants/
├── backend/                # Node.js 서버
│   └── src/
│       ├── app.ts          # Express 앱
│       └── services/       # 비즈니스 로직
└── public/                 # 정적 파일
    ├── manifest.json       # PWA Manifest
    └── icons/              # PWA 아이콘
```

## 🎮 사용법

### 카메라 조작
- **마우스 드래그**: 카메라 회전
- **마우스 휠**: 줌 인/아웃
- **우클릭 드래그**: 카메라 이동

### 주식 정보 확인
- **건물 클릭**: 해당 종목의 상세 정보 표시
- **컨트롤 패널**: 뷰 모드 및 효과 설정
- **우측 패널**: 전체 종목 리스트 및 선택된 종목 정보

### 시각화 규칙
- **건물 높이**: 시가총액 (로그 스케일)
- **색상**:
  - 🔴 빨간색: 하락 (-5% 이하)
  - 🟡 노란색: 보합 (-1% ~ +1%)
  - 🟢 초록색: 상승 (+1% 이상)
  - 🔵 파란색: 급등 (+5% 이상)
- **조명 효과**: 거래량 기반 밝기
- **특수 효과**: 급등락 시 네온 번쩍임

## 🛠️ 기술 스택

### Frontend
- **Next.js 14** - React 프레임워크
- **Three.js** - 3D 렌더링
- **@react-three/fiber** - React Three.js 통합
- **@react-three/drei** - Three.js 헬퍼
- **Zustand** - 상태 관리
- **Socket.IO Client** - 실시간 통신
- **Tailwind CSS** - 스타일링
- **TypeScript** - 타입 안정성

### Backend
- **Node.js + Express** - 서버
- **Socket.IO** - WebSocket 서버
- **TypeScript** - 타입 안정성
- **node-cron** - 스케줄링

## 📱 PWA 기능

이 앱은 Progressive Web App으로 구현되어 다음 기능을 지원합니다:

- **오프라인 지원**: 마지막 데이터 캐싱
- **홈 화면 추가**: 네이티브 앱처럼 설치 가능
- **푸시 알림**: 급등락 종목 알림 (향후 구현)
- **백그라운드 동기화**: 백그라운드에서 데이터 업데이트

## 🔧 환경 변수

### Frontend (.env.local)
```
NEXT_PUBLIC_WS_URL=ws://localhost:3001
```

### Backend (.env)
```
PORT=3001
FRONTEND_URL=http://localhost:3000
```

## 📊 주요 종목

### KOSPI 대형주
- 삼성전자, SK하이닉스, LG화학, 삼성바이오로직스, NAVER
- 카카오, 삼성SDI, 현대차, 기아, 셀트리온

### KOSDAQ 주요주
- 에코프로, 에코프로비엠, 펄어비스, 위메프, HLB
- 알테오젠, 스튜디오드래곤, 컴투스, 티앤엘, 바이오니아

## 🚀 배포

### Vercel (Frontend)
```bash
npm run build
vercel --prod
```

### Railway/Heroku (Backend)
```bash
cd backend
npm run build
# 배포 플랫폼별 명령어 실행
```

## 🔮 향후 계획

- [ ] 실제 주식 API 연동 (한국투자증권 Open API)
- [ ] VR 지원
- [ ] 소셜 기능 (다중 사용자)
- [ ] 히스토리 모드 (과거 데이터 재현)
- [ ] 섹터별 구역 분리
- [ ] 알림 시스템

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 `LICENSE` 파일을 참조하세요.

## 📞 문의

프로젝트 관련 문의사항이 있으시면 이슈를 생성해 주세요.

---

**Live Data City** - 주식 시장을 3D로 경험하세요! 🏙️📈
