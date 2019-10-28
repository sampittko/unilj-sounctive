package cbsp;

// 0.106
// 0.269

public class GeneralClickFilter extends ClickFilterBase {
	private final int WINDOW_SIZE = 2048;
	private final int SMALL_WINDOW_SIZE = 20;

	public static void main(String args[]) {
		new GeneralClickFilter().run();
	}

	/**
	 * Performs sample processing.
	 *
	 * @param samples
	 *            A mutable array of float samples
	 */
	@Override
	protected void process(float[] samples) {
		double sum = 0.0, mean, std, threshold;
		double[] stdSamples = new double[samples.length];

		for (int i = 0; i < samples.length; i++) {
			if (i + 1 < samples.length) {
				sum += Math.abs(samples[i] - samples[i + 1]);
			}
		}

		mean = sum / samples.length;

		System.out.println(mean);

		sum = 0;

		for (int i = 0; i < samples.length; i++) {
			stdSamples[i] = Math.pow(samples[i] - mean, 2) - Math.pow(mean, 2);
			sum += stdSamples[i];
		}

		std = Math.sqrt(sum / stdSamples.length);

		System.out.println(std);

		threshold = mean + (3.0 * std);

		// TODO Task 1.

		for (int i = 0; i < samples.length; i++) {
			if (i > 0 && Math.abs(samples[i - 1] - samples[i]) > threshold) {
				samples[i] = 0.0f;
			}
		}

		for (int i = 0; i < samples.length; i++) {

			// vypocet STD vo velkom okne

			for (int j = 0; j < SMALL_WINDOW_SIZE; j++) {



			}
		}
	}
}
