/* eslint-disable no-return-assign */
/* eslint-disable max-classes-per-file */
/* eslint-disable linebreak-style */
// eslint-disable-next-line import/no-extraneous-dependencies
import { el, setChildren } from 'redom';
import { Chart } from 'chart.js/auto';
import { renderTitleBox } from './titlePage';
import router from '../../assets/router';

// Настройки графика
Chart.defaults.font.size = '20';
Chart.defaults.font.weight = 'bold';
Chart.defaults.font.family = "'Ubuntu', 'Arial'";

const chartAreaBorder = {
  id: 'chartAreaBorder',
  beforeDraw(chart, args, options) {
    const {
      ctx, chartArea: {
        left, top, width, height,
      },
    } = chart;
    ctx.save();
    ctx.strokeStyle = options.borderColor;
    ctx.lineWidth = options.borderWidth;
    ctx.setLineDash(options.borderDash || []);
    ctx.lineDashOffset = options.borderDashOffset;
    ctx.strokeRect(left, top, width, height);
    ctx.restore();
  },
};

// Получение массива для графика
function balance(arr, check, period) {
  const copyObj = arr.transactions;
  const rezaltArr = [];
  let arrTrans = [];
  const mount = ['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'];

  // Определение периода выборки
  const dateRange = new Date();
  dateRange.setMonth(dateRange.getMonth() - (period - 1));

  const z = copyObj.filter((i) => new Date(i.date) >= dateRange)
    .map((item) => {
      if (item.from === check) {
        return { month: new Date(item.date).getMonth() + 1, amount: -item.amount };
      }

      return { month: new Date(item.date).getMonth() + 1, amount: item.amount };
    });
  arrTrans = z.reduce((a, c) => (a[c.month] = (a[c.month] || 0) + c.amount, a), []);

  // Замена цифры месяца на слово
  arrTrans.map((item, index) => {
    mount.map((i, ind) => {
      if (index === (ind + 1)) {
        rezaltArr.push({ month: i, amount: item });
      }
      return rezaltArr;
    });
    return rezaltArr;
  });

  return rezaltArr;
}
// Получение массива для графика динамики
function ratio(arr, check, period) {
  const mount = ['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'];
  const copyObj = arr.transactions; const transactionsByMonth = {};
  // Определение периода выборки
  const dateRange = new Date();
  dateRange.setMonth(dateRange.getMonth() - (period - 1));

  copyObj.filter((i) => new Date(i.date) >= dateRange);

  copyObj.forEach((transaction) => {
    const month = new Date(transaction.date).getMonth();
    transactionsByMonth[month] = transactionsByMonth[month] || { incoming: 0, outgoing: 0 };

    if (transaction.from === check) {
      transactionsByMonth[month].outgoing += transaction.amount;
    } else {
      transactionsByMonth[month].incoming += transaction.amount;
    }
  });

  const incomingData = mount.map((month, index) => transactionsByMonth[index]?.incoming || 0);
  const outgoingData = mount.map((month, index) => transactionsByMonth[index]?.outgoing || 0);
  const incomingArr = []; const
    outcomingArr = [];
  incomingData.map((item, index) => {
    mount.map((i, ind) => {
      if (index === (ind)) {
        incomingArr.push({ month: i, amount: item });
      }
      return incomingArr;
    });
    return incomingArr;
  });

  outgoingData.map((item, index) => {
    mount.map((i, ind) => {
      if (index === (ind)) {
        outcomingArr.push({ month: i, amount: item });
      }
      return outcomingArr;
    });
    return outcomingArr;
  });

  return { incomingArr, outcomingArr };
}

// Блок баланса с графиком динамики
export function renderBalanceBox(text, months, obj, check) {
  const $balanceBox = el('div.balance__box');
  const $diagramWrapper = el('div.balance__diagram');
  const $diagramBox = el('canvas.diagram', {
    maxWidth: '100%',
    width: '100%',
    maintainAspectRatio: false,
    ariaLabel: 'график баланса',
  });
  const data = balance(obj, check, months);

  // Максимальная сумма
  let maxAmount = { month: '', amount: 0 };
  if (data.length) {
    maxAmount = data.reduce((perv, curr) => (perv.amount > curr.amount
      ? perv : curr), {});
  }

  // Создание графика
  const diagram = new Chart(
    $diagramBox,
    {
      type: 'bar',
      data: {
        labels: data.map((row) => row.month),
        datasets: [
          {
            data: data.map((row) => row.amount),
            backgroundColor: '#116ACC',
          },
        ],
      },
      options: {
        scales: {
          y: {
            border: {
              display: true,
              color: '#000',
            },
            position: 'right',
            min: 0,
            max: `${maxAmount.amount.toFixed(0)}`,
            beginAtZero: true,
            afterTickToLabelConversion: (ctx) => {
              ctx.ticks = [];
              ctx.ticks.push({ value: 0, label: '0' });
              ctx.ticks.push({
                value: `${maxAmount.amount.toFixed(0)}`,
                label: `${maxAmount.amount.toFixed(0)}`,
              });
            },
            grid: {
              display: false,
            },
          },
          x: {
            border: {
              display: true,
              color: '#000',
            },
            grid: {
              display: false,
            },
          },
        },
        plugins: {
          chartAreaBorder: {
            borderColor: '#000',
            borderWidth: 1,
          },
          tooltip: {
            enabled: false,
          },
          legend: {
            display: false,
          },
        },
      },
      plugins: [chartAreaBorder],
    },
  );

  setChildren($diagramWrapper, $diagramBox);
  setChildren($balanceBox, [
    renderTitleBox('h4', 'title__box', text),
    $diagramWrapper,
  ]);

  $balanceBox.addEventListener('click', () => {
    router.navigate(`/history/:${check}`);
  });

  return $balanceBox;
}

export function renderRatioBox(text, months, obj, check) {
  const $balanceBox = el('div.balance__box');
  const $diagramWrapper = el('div.balance__diagram');
  const $diagramBox = el('canvas.diagram', { width: '100%', height: '195px', ariaLabel: 'график соотношения входящих и исходящих операций' });

  const data = ratio(obj, check, months);

  // Максимальная сумма по разным транзакциям
  let maxAmountOut = 0;

  if (data.outcomingArr.length) {
    maxAmountOut = data.outcomingArr.reduce((perv, curr) => (perv.amount > curr.amount
      ? perv : curr), {});
  }
  let maxAmountInc = 0;
  if (data.incomingArr.length) {
    maxAmountInc = data.incomingArr.reduce((perv, curr) => (perv.amount > curr.amount
      ? perv : curr), {});
  }
  const maxAmount = maxAmountOut.amount
  > maxAmountInc.amount ? maxAmountOut.amount : maxAmountInc.amount;

  const baseAmount = maxAmountOut.amount
  > maxAmountInc.amount ? maxAmountInc.amount : maxAmountOut.amount;

  // Создание графика
  const diagram = new Chart(
    $diagramBox,
    {
      type: 'bar',
      data: {
        labels: data.outcomingArr.map((row) => row.month),
        datasets: [
          {
            data: data.outcomingArr.map((row) => row.amount),
            backgroundColor: '#FD4E5D',
          },
          {
            data: data.incomingArr.map((row) => row.amount),
            backgroundColor: '#76CA66',
          },

        ],
      },
      options: {
        scales: {
          y: {
            border: {
              display: true,
              color: '#000',
            },
            position: 'right',
            min: 0,
            max: maxAmount.toFixed(0),
            beginAtZero: true,
            afterTickToLabelConversion: (ctx) => {
              ctx.ticks = [];
              ctx.ticks.push({ value: 0, label: '0' });
              ctx.ticks.push({ value: baseAmount.toFixed(0), label: baseAmount.toFixed(0) });
              ctx.ticks.push({ value: maxAmount.toFixed(0), label: maxAmount.toFixed(0) });
            },
            grid: {
              display: false,
            },
            stacked: true,
          },
          x: {
            border: {
              display: true,
              color: '#000',
            },
            grid: {
              display: false,
            },
            stacked: true,
          },
        },
        plugins: {
          chartAreaBorder: {
            borderColor: '#000',
            borderWidth: 1,
          },
          tooltip: {
            enabled: false,
          },
          legend: {
            display: false,
            title: {
              display: false,
            },
          },
        },
      },
      plugins: [chartAreaBorder],
    },
  );

  setChildren($diagramWrapper, $diagramBox);
  setChildren($balanceBox, [
    renderTitleBox('h4', 'title__box', text),
    $diagramWrapper,
  ]);

  return $balanceBox;
}
