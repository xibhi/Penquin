import ora from 'ora';

export const getSpinner = (text: string) => {
  const spinner = ora({
    text: `${text}\n`,
    spinner: 'dots',
    isEnabled: true,
    isSilent: false
  });

  return spinner;
}