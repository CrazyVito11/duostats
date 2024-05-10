
export function secondsToFormattedString(totalSeconds: number): string {
    let output = '';

    const seconds = Math.floor(totalSeconds % 3600 % 60);
    const minutes = Math.floor(totalSeconds % 3600 / 60);
    const hours   = Math.floor(totalSeconds / 3600);

    // Add hours if we have more than 1 hour
    if (hours > 0) {
        output += `${hours.toString().padStart(2, '0')}:`;
    }

    // Add minutes and seconds
    output += `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    return output;
};
