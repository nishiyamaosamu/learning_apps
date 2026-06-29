import 'package:go_router/go_router.dart';
import '../app/app_config.dart';
import '../screens/home_screen.dart';
import '../screens/tabs/anki.dart';
import '../screens/tabs/exercise.dart';
import '../screens/tabs/lesson.dart';

GoRouter buildRouter(AppConfig config) {
  return GoRouter(
    initialLocation: '/',
    routes: [
      // タブシェルを起点に固定。詳細画面はシェルのサブルートとして
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
        ],
      ),
    ],
  );
}
