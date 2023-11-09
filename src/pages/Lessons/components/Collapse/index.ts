import { Collapse as CollapseBase } from './Collapse';
import { Panel } from './Panel';

export const Collapse = CollapseBase as typeof CollapseBase & { Panel: typeof Panel };

Collapse.Panel = Panel;
