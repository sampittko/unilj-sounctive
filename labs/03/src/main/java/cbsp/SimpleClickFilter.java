package cbsp;

public class SimpleClickFilter extends ClickFilterBase {
	public static void main(String args[]) {
		new SimpleClickFilter().run();
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

		// ANSWERS
		// mean 0.010
		// std 0.0107
	}
}
