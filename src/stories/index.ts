import { storiesOf } from '@storybook/angular';
import { StarComponent } from 'src/app/shared/star.component';

storiesOf('Star Component', module)
  .add('Rating 1', () => ({
    component: StarComponent,
    props: {
      rating: 3
    },
  }))
  .add('Rating 2', () => ({
    component: StarComponent,
    props: {
        rating: 1
    },
  }));