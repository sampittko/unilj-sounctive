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
		double sum = 0, mean, threshold, meanSamplesStd;
		double[] samplesStd = new double[samples.length];

		for (int i = 0; i < samples.length; i++) {
			sum += Math.abs(samples[i]);
		}

		mean = sum / samples.length;

		System.out.println(mean);

		for (int i = 0; i < samples.length; i++) {
			samplesStd[i] = Math.abs(samples[i] - mean);
		}

		sum = 0;

		for (int i = 0; i < samplesStd.length; i++) {
			sum += Math.abs(samplesStd[i]);
		}

		threshold = sum / samplesStd.length;

		System.out.println(threshold);

		// TODO Task 1.

		for (int i = 0; i < samples.length; i++) {
			if (i > 0 && Math.abs(samples[i - 1] - samples[i]) > threshold) {
				samples[i] = 0.0f;
			}
		}
	}
}
