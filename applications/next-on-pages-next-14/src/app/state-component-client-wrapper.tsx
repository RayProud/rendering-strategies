'use client';
// imagine that StateComponent is a component from a library that doesn't have a 'use client'
import StateComponent from './state-component';

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
};

function Wrapper(args: Props) {
  return <StateComponent {...args} />;
}

export default Wrapper;
