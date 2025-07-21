import icon from './assets/icon/addCollectionIcon.svg'
export const capsules = [
    {
        id: "12345",
        name: "Светлый путь",
        description: "Каждая капсула содержит табачные смеси",
        avatar: icon,
        color: "Красный",  // заменено на цвет
    },
    {
        id: "67890",
        name: "Серебряный путь",
        description: "Каждая капсула содержит фрукты и ягоды",
        avatar: icon,
        color: "Серебряный",
    },
    {
        id: "54321",
        name: "Тропическая энергия",
        description: "Смесь манго, ананаса и лайма для бодрящего вкуса",
        avatar: icon,
        color: "Зеленый",
    },
    {
        id: "09876",
        name: "Мятный заряд",
        description: "Капсула с освежающим ментоловым вкусом",
        avatar: icon,
        color: "Мятный",
    },
    {
        id: "11223",
        name: "Ягодный микс",
        description: "Сладкие и кислые ягоды в одной капсуле",
        avatar: icon,
        color: "Ягодный",
    },
    {
        id: "33445",
        name: "Цитрусовый взрыв",
        description: "Апельсин, лимон и грейпфрут для яркого вкуса",
        avatar: icon,
        color: "Цитрусовый",
    },
    {
        id: "55667",
        name: "Фиалковая прохлада",
        description: "Нежный цветочный аромат с легкой свежестью",
        avatar: icon,
        color: "Фиолетовый",
    },
    {
        id: "77889",
        name: "Карамельный дым",
        description: "Глубокий вкус с нотками карамели и табака",
        avatar: icon,
        color: "Карамельный",
    },
    {
        id: "99001",
        name: "Зеленый лес",
        description: "Свежесть хвои и пряных трав",
        avatar: icon,
        color: "Зеленый",
    },
    {
        id: "24680",
        name: "Ночная вишня",
        description: "Густой вкус темной вишни с лёгкой горчинкой",
        avatar: icon,
        color: "Вишневый",
    },
];
export const LOCATION_TYPES = [
    "Ресторан",
    "Кафе",
    "Бистро",
    "Стейкхаус",
    "Пиццерия",
    "Суши-бар",
    "Вегетарианское заведение",
] as const;

export type LocationType = typeof LOCATION_TYPES[number];


