import React from 'react';
import { Button } from '@components/molecules/Button';

export const DoneButton = (props: any) => {
  return (
    <Button
      title="Finish"
      variant="ghost"
      {...props}
    />
  );
};

export const SkipButton = (props: any) => {
  return (
    <Button
      title="Skip"
      variant="ghost"
      {...props}
    />
  );
};

export const NextButton = (props: any) => {
  return (
    <Button
      title="Next"
      variant="ghost"
      {...props}
    />
  );
};
