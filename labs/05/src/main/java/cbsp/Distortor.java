package cbsp;

import com.jsyn.data.DoubleTable;
import com.jsyn.ports.UnitInputPort;
import com.jsyn.ports.UnitOutputPort;
import com.jsyn.unitgen.Circuit;
import com.jsyn.unitgen.FunctionEvaluator;
import com.jsyn.unitgen.InterpolatingDelay;
import com.jsyn.unitgen.Multiply;
import com.jsyn.unitgen.PassThrough;
import com.jsyn.unitgen.UnitSource;
import com.softsynth.shared.time.TimeStamp;

public class Distortor extends Circuit implements UnitSource {
	// Ports
	// TODO - assign the ports
	public final UnitInputPort input;
	public final UnitOutputPort output;
	public final UnitOutputPort feedback;

	// Circuit components
	// Everything that I need to know I have here
	protected Multiply masterIn;
	protected DoubleTable waveShape;
	protected FunctionEvaluator waveShaper;
	protected Multiply outputGain;
	protected InterpolatingDelay delay;

	Distortor() {
		// TODO Task 2.

		add(masterIn = new Multiply());
		masterIn.inputA.set(1.0);
		input = masterIn.inputB; // we kind of present this out of the distorter box

		double[] shape = new double[]{ -0.8, -0.8, -0.8, -0.6, -0.2, 0.0, 0.2, 0.6, 0.8, 0.8, 0.8 };
		waveShape = new DoubleTable(shape);

		add(waveShaper = new FunctionEvaluator());
		waveShaper.function.set(waveShape);
		waveShaper.input.connect(masterIn.output);

		add(outputGain = new Multiply());
		outputGain.inputA.connect(waveShaper.output);
		outputGain.inputB.set(1.0);

		add(delay = new InterpolatingDelay());
		delay.delay.set(0.1);
		delay.allocate(1024); // buffer needs to be big enough so e.g. 102
		delay.input.connect(outputGain.output);

		output = waveShaper.output;
		feedback = delay.output;

		// The code below is just so the default (null) distortor doesn't crash
		// the application - it should be removed
//		PassThrough pt = new PassThrough();
//		add(pt);
//		input = pt.input;
//		output = pt.output;
//		addPort(feedback = new UnitOutputPort("temporary"));
//		feedback.setValueInternal(0.0);


	}

	@Override
	public UnitOutputPort getOutput() {
		return output;
	}

	public void distort(TimeStamp start, double amp, double dgain, double fbfreq, double fbgain) {
        // TODO Task 2 - Uncomment
		masterIn.inputA.set(dgain / amp, start);
        waveShaper.amplitude.set(amp, start);
        delay.delay.set(1.0 / fbfreq, start);
        outputGain.inputA.set(fbgain, start);
	}
}
