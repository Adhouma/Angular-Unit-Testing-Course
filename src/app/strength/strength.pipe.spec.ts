import { StrengthPipe } from "./strength.pipe";

describe('StrengthPipe Test', () => {

    it('should display weak if strength is 5', () => {
        // Given
        const pipe = new StrengthPipe();

        // When
        const result = pipe.transform(5);

        // Then
        expect(result).toEqual('5 (weak)');
    });

    it('should display strong if strength is between 10 and 20', () => {
        // Given
        const pipe = new StrengthPipe();

        // When
        const result = pipe.transform(13);

        // Then
        expect(result).toEqual('13 (strong)');
    });

    it('should display unbelievable if strength is more than 20', () => {
        // Given
        const pipe = new StrengthPipe();

        // When
        const result = pipe.transform(31);

        // Then
        expect(result).toEqual('31 (unbelievable)');
    });
});