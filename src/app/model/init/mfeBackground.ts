import { $mfeBackground, resetMfeBackGround, setMfeBackGround } from '@src/app/model';

$mfeBackground.on(setMfeBackGround, (_, value) => value).reset([resetMfeBackGround]);
