package cbsp;

import com.jsyn.data.FloatSample;
import com.jsyn.unitgen.FilterBandStop;
import com.jsyn.unitgen.VariableRateMonoReader;
import com.jsyn.util.SampleLoader;

import java.io.File;
import java.io.IOException;

public class NotchFilter extends FiltersBase {
	private VariableRateMonoReader reader;

	NotchFilter() {
		super();
		sleep = 0.2;
		
		// TODO Task 2.

		FloatSample fs = null;

		try {
			fs = SampleLoader.loadFloatSample(new File("src/main/media/siney.wav"));
		} catch (IOException e) {
			e.printStackTrace();
		}

		reader = new VariableRateMonoReader();
		reader.rate.set(fs.getFrameRate());
		reader.dataQueue.queue(fs);
		synth.add(reader);

		FilterBandStop filter = new FilterBandStop();
		filter.frequency.set(240);
		filter.Q.set(1.0);
		filter.input.connect(reader.output);
		synth.add(filter);

		// TODO Uncomment output code for Task 2.

		output = filter.output;
	}

	protected boolean isFinished() {
		
		// TODO Uncomment reader code for Task 2.
		
		return !reader.dataQueue.hasMore();
//		return true;
	}

	public static void main(String[] args) {
		new NotchFilter().run();
	}
}
