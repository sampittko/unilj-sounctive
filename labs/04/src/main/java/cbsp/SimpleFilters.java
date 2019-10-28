package cbsp;

import com.jsyn.unitgen.FilterLowPass;
import com.jsyn.unitgen.PassThrough;
import com.jsyn.unitgen.SineOscillator;

public class SimpleFilters extends FiltersBase {

	SimpleFilters() {
		super();

		SineOscillator sOsc1 = new SineOscillator();
		sOsc1.frequency.set(350);
		sOsc1.amplitude.set(0.5);
		synth.add(sOsc1);

		SineOscillator sOsc2 = new SineOscillator();
		sOsc2.frequency.set(1400);
		sOsc2.amplitude.set(0.5);
		synth.add(sOsc2);

		SineOscillator sOsc3 = new SineOscillator();
		sOsc3.frequency.set(3000);
		sOsc3.amplitude.set(0.5);
		synth.add(sOsc3);

		// TODO Task 1.

		PassThrough passThrough = new PassThrough();

		synth.add(passThrough);

		sOsc1.output.connect(passThrough.input);
		sOsc2.output.connect(passThrough.input);
		sOsc3.output.connect(passThrough.input);

		FilterLowPass filter = new FilterLowPass();
		filter.frequency.set(1400);
		filter.Q.set(1.0);
		synth.add(filter);
		passThrough.output.connect(filter.input);

		// TODO Uncomment output code for Task 1.

		output = filter.output;
		
	}

	public static void main(String[] args) {
		new SimpleFilters().run();
	}
}
