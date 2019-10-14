package cbsp;

import com.jsyn.JSyn;
import com.jsyn.Synthesizer;
import com.jsyn.unitgen.*;

public class SoundGeneratorB {
	
	// Graph components.
	private Synthesizer synth;
	private LineOut lineOut;
	private UnitOscillator osc1;
	private UnitOscillator osc2;

	public static void main(String args[]) {
		new SoundGeneratorB().start();
	}

	private void start() {

		synth = JSyn.createSynthesizer();					// Initialization of JSyn API

		synth.add(lineOut = new LineOut());					// Create line out and add it to the graph.
		synth.start();

		// 0.91, 0.51, 0.71, 0.86, 1.0, 0.71, 0.54, 0.2, 0.18
		double[] harmonics_1 = new double[9];
		harmonics_1[0] = 0.91;
		harmonics_1[1] = 0.51;
		harmonics_1[2] = 0.71;
		harmonics_1[3] = 0.86;
		harmonics_1[4] = 1.0;
		harmonics_1[5] = 0.71;
		harmonics_1[6] = 0.54;
		harmonics_1[7] = 0.2;
		harmonics_1[8] = 0.18;

		// 0.53, 1.0, 0.94, 0.95, 0.66, 0.58
		double[] harmonics_2 = new double[9];
		harmonics_2[0] = 0.53;
		harmonics_2[1] = 1.0;
		harmonics_2[2] = 0.94;
		harmonics_2[3] = 0.95;
		harmonics_2[4] = 0.66;
		harmonics_2[5] = 0.58;
		harmonics_2[6] = 0.0;
		harmonics_2[7] = 0.0;
		harmonics_2[8] = 0.0;

		// TODO Task 3, 4 and 5.

		for (int i = 1; i < 10; i++) {
			SineOscillator sineOsc = new SineOscillator(166.0, harmonics_1[i - 1]);

			sineOsc.output.connect(0, lineOut.input, 0);
			sineOsc.output.connect(0, lineOut.input, 1);

			synth.add(sineOsc);
		}

		lineOut.start();									// Start the data flow in graph.

		// Play signal for 2 seconds.
		try {
			synth.sleepFor(2);
		} catch (InterruptedException e) {
			e.printStackTrace();
		}

		synth.stop();										// Turn off JSyn engine
	}
}