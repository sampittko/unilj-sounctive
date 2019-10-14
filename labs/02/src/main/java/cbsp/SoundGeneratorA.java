package cbsp;

import javax.sound.sampled.AudioFormat;
import javax.sound.sampled.AudioSystem;
import javax.sound.sampled.DataLine;
import javax.sound.sampled.SourceDataLine;

public class SoundGeneratorA {

	public static void main(String[] args) {

        final int SECONDS = 1;															// Duration of our signal.
        final int SAMPLE_RATE = 8000;														// Number of samples recorded in 1 second.
        final double AMPLITUDE = 127.0;
        final double FREQUENCY = 166.0;
        final double ANGULAR_VELOCITY = 2 * Math.PI * FREQUENCY;
        final double PHASE = 0.0;
//        final double PERIOD = SAMPLE_RATE / FREQUENCY;

        try {
            AudioFormat af = new AudioFormat((float) SAMPLE_RATE, 8,
                    1, true, true);		                // Define the format: AudioFormat(sample rate, sample size in bits, channels, signed, endian)
            DataLine.Info info = new DataLine.Info(SourceDataLine.class, af);		// Define the audio-related functionality.
            SourceDataLine source = (SourceDataLine) AudioSystem.getLine(info);		// Define a data line to which data may be written.
            source.open(af);
            source.start();

            byte[] buf = new byte[SAMPLE_RATE * SECONDS];						// sample rate * seconds = signal length

            // TODO Tasks 1 and 2.

            // 0.91, 0.51, 0.71, 0.86, 1.0, 0.71, 0.54, 0.2, 0.18
            final double HARMONICS_1 = 0.91;
            // 0.53, 1.0, 0.94, 0.95, 0.66, 0.58
            final double HARMONICS_2 = 0.53;

            for (int i = 0; i < buf.length; i++) {
                final double ANGLE = Math.sin((ANGULAR_VELOCITY * i) / SAMPLE_RATE) + PHASE;
                buf[i] = (byte) ((HARMONICS_1 * AMPLITUDE * ANGLE) + (HARMONICS_2 * AMPLITUDE * ANGLE));
            }

            source.write(buf, 0, buf.length);									// Write buffer to the SourceDataLine.
            source.drain();														// Play the samples in the buffer.
            source.stop();
            source.close();

        } catch (Exception e) {
            e.printStackTrace();
        }
	}
}
