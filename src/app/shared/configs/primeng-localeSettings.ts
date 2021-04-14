import {LocaleSettings} from 'primeng/calendar';

export const calendarOptions: LocaleSettings = {
  firstDayOfWeek: 1,
  dayNames: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
  dayNamesShort: ['Воскр', 'Пон', 'Втор', 'Сред', 'Четв', 'Пятн', 'Субб'],
  dayNamesMin: ['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'],
  monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май',
    'Июнь', 'Июль', 'АВГ', 'СЕН', 'ОКТ', 'НОЯБ', 'ДЕК'],
  monthNamesShort: ['янв', 'фев', 'мар', 'апр', 'май', 'июнь', 'июль', 'авг', 'сент', 'окт', 'нояб', 'дек'],
  today: 'Сегодня',
  dateFormat: 'dd.MM.yyyy',
  clear: 'Очистить'
};
