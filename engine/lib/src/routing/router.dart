import 'package:go_router/go_router.dart';
import '../app/app_config.dart';
import '../screens/anki_study.dart';
import '../screens/home_screen.dart';
import '../screens/tabs/exercise.dart';
import '../screens/video_watch.dart';

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
          // 動画視聴。id だけを渡し、章・本体・次の動画は videoLookup で引く。
          GoRoute(
            path: 'videos/:id',
            builder: (context, state) =>
                VideoWatchScreen(id: state.pathParameters['id']!),
          ),
          GoRoute(
            path: 'exercises/:id',
            builder: (context, state) => Exercise(
              id: state.pathParameters['id']!,
              title: state.extra as String? ?? '',
            ),
          ),
          // 暗記カード学習（フリップ）。id でデッキをロードし、全カードを順番どおり
          // 出題する（AnkiStudyRoute が ankiProvider を引く）。extra=true なら
          // 「覚えていないカードを見る」（デッキ内の未習得カードだけに絞る）。
          GoRoute(
            path: 'anki/:id',
            builder: (context, state) => AnkiStudyRoute(
              id: state.pathParameters['id']!,
              onlyUnknown: state.extra == true,
            ),
          ),
        ],
      ),
    ],
  );
}
