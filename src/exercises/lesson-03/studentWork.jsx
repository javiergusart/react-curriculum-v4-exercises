//Lesson-03 Component Lifecycle, Hooks, State, and Props
//Exercise: React Bug Hunt – Fix the broken components in this folder
//Import components here

import BugEffectLoop from './BugEffectLoop.jsx';
import BugMutatedState from './BugMutatedState.jsx';
import BugProps from './BugProps.jsx';

export default function StudentWork() {
  return (
    <div>
      <h2>Lesson 3 Bug Fixes</h2>
      <BugEffectLoop />
      <BugMutatedState />
      <BugProps name="Javier" />
    </div>
  );
}
