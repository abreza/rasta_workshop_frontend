import React from 'react';

import BoxSimulator from './BoxSimulator';
import CompleteCode from './CompleteCode';
import Experts from './Experts';
import Chart from './PhysicArticle/Chart';
import Graph from './PhysicArticle/Graph';

export const MINI_GAMES = [
  {
    label: 'بازی زندگی کانوی',
    url: 'https://mini-games-sigma.vercel.app/Conways_Game_Of_Life'
  },
  {
    label: 'رفتار جمعی ماهی‌ها',
    url: 'https://mini-games-sigma.vercel.app/Conways_Game_Of_Life'
  },
  {
    label: 'بهینه‌سازی مورچه‌ها',
    url: 'http://www.netlogoweb.org/web?http://www.netlogoweb.org/assets/modelslib/Sample%20Models/Biology/Ants.nlogo'
  },
  {
    label: 'حساب به نقطه‌ها',
    url: 'https://mini-games-sigma.vercel.app/Account2Points'
  },

]

// physic_article_graph: {
//   label: 'گراف مقاله فیزیک',
//   component: Graph,
// },
// physic_article_chart: {
//   label: 'نمودار مقاله فیزیک',
//   component: Chart,
// },
// first_complete_code: {
//   label: 'بازی کامل کردن کد اول',
//   component: CompleteCode,
//   props: { mode: 0 },
// },
// second_complete_code: {
//   label: 'بازی کامل کردن کد دوم',
//   component: CompleteCode,
//   props: { mode: 1 },
// },
// third_complete_code: {
//   label: 'بازی کامل کردن کد سوم',
//   component: CompleteCode,
//   props: { mode: 2 },
// },
// first_box_simulator: {
//   label: 'بازی جعبه‌ها اول',
//   component: BoxSimulator,
//   props: { mode: 0 },
// },
// second_box_simulator: {
//   label: 'بازی جعبه‌ها دوم',
//   component: BoxSimulator,
//   props: { mode: 1 },
// },
// experts: {
//   label: 'بازی خبرگان',
//   component: Experts,
// },

function MiniGames(props) {
  const { gameId } = props.match.params;
  if (!MINI_GAMES[gameId]) {
    return <div></div>;
  }
  const MiniGameComponent = MINI_GAMES[gameId].component;
  return <MiniGameComponent {...MINI_GAMES[gameId].props} />;
}

export default MiniGames;
