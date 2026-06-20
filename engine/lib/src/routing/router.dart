import 'package:go_router/go_router.dart';
import '../app/app_config.dart';
import '../screens/dev/animation_viewer.dart';
import '../screens/dev/avatar_viewer.dart';
import '../screens/home_screen.dart';
import '../screens/tabs/anki.dart';
import '../screens/tabs/exercise.dart';
import '../screens/tabs/lesson.dart';

GoRouter buildRouter(AppConfig config) {
  return GoRouter(
    initialLocation: '/',
    routes: [
      // ホーム（タブシェル）を起点に固定。詳細画面は home のサブルートとして
      // ルートNavigator上に全画面でpushされ、タブバーを含む画面全体が遷移する。
      GoRoute(
        path: '/',
        builder: (context, state) => const HomeScreen(),
        routes: [
          GoRoute(
            path: 'lessons/:id',
            builder: (context, state) => Lesson(
              id: state.pathParameters['id']!,
              title: state.extra as String? ?? '',
            ),
          ),
          GoRoute(
            path: 'exercises/:id',
            builder: (context, state) => Exercise(
              id: state.pathParameters['id']!,
              title: state.extra as String? ?? '',
            ),
          ),
          GoRoute(
            path: 'anki/:id',
            builder: (context, state) => Anki(
              id: state.pathParameters['id']!,
              title: state.extra as String? ?? '',
            ),
          ),
          // 図解アニメの開発用ビューア（debug専用エントリから開く）。
          GoRoute(
            path: 'dev/animations',
            builder: (context, state) => const AnimationViewer(),
          ),
          // 喋るアバターの開発用ビューア（debug専用エントリから開く）。
          GoRoute(
            path: 'dev/avatar',
            builder: (context, state) => const AvatarViewer(),
          ),
        ],
      ),
    ],
  );
}
