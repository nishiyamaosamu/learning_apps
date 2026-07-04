import 'package:flutter/material.dart';

import '../../design/app_colors.dart';
import '../../design/app_dimens.dart';
import '../../design/app_motion.dart';
import '../../design/app_typography.dart';
import '../tabs/widgets/exercise_summary.dart';

/// 学習サマリーカード（DESIGN.html 問題集タブの `.card` 内 `.pg-row` 群）。
///
/// 「進捗」行（primary の進捗バー）・「正誤率」行（correct / incorrect の積み上げ
/// バー）・○✕ 凡例を縦に並べる。正誤は色だけに頼らず記号併記で二重符号化（RULE 2）。
/// テーマ既定の [Card]（surface＋border＋lg 角丸）を使い、パディングは 14。
/// 問題集タブの全体サマリーと、問題集詳細の進捗パネルの両方で使う。
class ExerciseSummaryCard extends StatelessWidget {
  const ExerciseSummaryCard({super.key, required this.summary});

  final ExerciseSummary summary;

  @override
  Widget build(BuildContext context) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(14),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            _ProgressRow(
              label: '進捗',
              fraction: summary.progress,
              percent: summary.progressPercent,
            ),
            const SizedBox(height: 10),
            _AccuracyRow(summary: summary),
            const SizedBox(height: 7),
            _Legend(correct: summary.correct, wrong: summary.wrong),
          ],
        ),
      ),
    );
  }
}

/// pg-row の共通レイアウト（ラベル 36dp ＋ 中央バー ＋ 値 34dp）。
class _PgRow extends StatelessWidget {
  const _PgRow({required this.label, required this.bar, required this.value});

  final String label;
  final Widget bar;
  final String value;

  @override
  Widget build(BuildContext context) {
    final c = context.colors;
    return Row(
      children: [
        SizedBox(
          width: 36,
          child: Text(
            label,
            style: const TextStyle(
              fontSize: 10,
              fontWeight: FontWeight.w700,
            ).copyWith(color: c.textSecondary),
          ),
        ),
        const SizedBox(width: 8),
        Expanded(child: bar),
        const SizedBox(width: 8),
        SizedBox(
          width: 34,
          child: Text(
            value,
            textAlign: TextAlign.right,
            style: AppTypography.mono(
              const TextStyle(fontSize: 10, fontWeight: FontWeight.w700),
            ).copyWith(color: c.textPrimary),
          ),
        ),
      ],
    );
  }
}

/// 進捗バー行（primary100 トラック／primary600 フィル、[AppMotion.slow] で伸びる）。
class _ProgressRow extends StatelessWidget {
  const _ProgressRow({
    required this.label,
    required this.fraction,
    required this.percent,
  });

  final String label;
  final double fraction;
  final int percent;

  @override
  Widget build(BuildContext context) {
    final c = context.colors;
    return _PgRow(
      label: label,
      value: '$percent%',
      bar: TweenAnimationBuilder<double>(
        tween: Tween(begin: 0, end: fraction.clamp(0.0, 1.0)),
        duration: AppMotion.slow,
        curve: AppMotion.easeInOut,
        builder: (context, value, _) => ClipRRect(
          borderRadius: BorderRadius.circular(AppRadius.full),
          child: SizedBox(
            height: 8,
            child: ColoredBox(
              color: c.primary100,
              child: Align(
                alignment: Alignment.centerLeft,
                child: FractionallySizedBox(
                  widthFactor: value,
                  // heightFactor が無いとフィルは高さ0に潰れて塗りが見えない。
                  heightFactor: 1,
                  child: ColoredBox(color: c.primary600),
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }
}

/// 正誤率行（correct / incorrect の積み上げバー＋正解率%）。
class _AccuracyRow extends StatelessWidget {
  const _AccuracyRow({required this.summary});

  final ExerciseSummary summary;

  @override
  Widget build(BuildContext context) {
    final c = context.colors;
    final answered = summary.answered;
    return _PgRow(
      label: '正誤率',
      value: '${summary.accuracyPercent}%',
      bar: ClipRRect(
        borderRadius: BorderRadius.circular(AppRadius.full),
        child: SizedBox(
          height: 8,
          // 未回答（answered==0）のときは薄いトラックだけの空バー。
          child: ColoredBox(
            color: c.border,
            child: answered == 0
                ? const SizedBox.expand()
                : Row(
                    // 既定 center だと子の ColoredBox が高さ0に潰れるため、
                    // フィルをバーの高さいっぱいに引き伸ばす。
                    crossAxisAlignment: CrossAxisAlignment.stretch,
                    children: [
                      if (summary.correct > 0)
                        Expanded(
                          flex: summary.correct,
                          child: ColoredBox(color: c.correct),
                        ),
                      if (summary.wrong > 0)
                        Expanded(
                          flex: summary.wrong,
                          child: ColoredBox(color: c.incorrect),
                        ),
                    ],
                  ),
          ),
        ),
      ),
    );
  }
}

/// ○✕ 凡例（correctText / incorrectText 文字色＋記号。バー下に 44dp インデント）。
class _Legend extends StatelessWidget {
  const _Legend({required this.correct, required this.wrong});

  final int correct;
  final int wrong;

  @override
  Widget build(BuildContext context) {
    final c = context.colors;
    return Padding(
      // 進捗バーの開始位置（ラベル 36 ＋ gap 8）に揃える。
      padding: const EdgeInsets.only(left: 44),
      child: Row(
        children: [
          _LegendItem(
            icon: Icons.circle_outlined,
            color: c.correctText,
            iconColor: c.correct,
            label: '正解',
            count: correct,
          ),
          const SizedBox(width: 12),
          _LegendItem(
            icon: Icons.close,
            color: c.incorrectText,
            iconColor: c.incorrect,
            label: '不正解',
            count: wrong,
          ),
        ],
      ),
    );
  }
}

class _LegendItem extends StatelessWidget {
  const _LegendItem({
    required this.icon,
    required this.color,
    required this.iconColor,
    required this.label,
    required this.count,
  });

  final IconData icon;
  final Color color;
  final Color iconColor;
  final String label;
  final int count;

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisSize: MainAxisSize.min,
      children: [
        Icon(icon, size: 12, color: iconColor),
        const SizedBox(width: 4),
        Text(
          '$label $count',
          style: TextStyle(
            fontSize: 10,
            fontWeight: FontWeight.w800,
            color: color,
          ),
        ),
      ],
    );
  }
}
