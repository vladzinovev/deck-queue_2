export const ServiceState=[
    {id:1, name:'Автомобиль(a)', shortName:'a'},
    {id:2, name:'Водительское удостоверение(b)',shortName:'b'},
    {id:3, name:'Документы(d)', shortName:'d'},
    {id:4, name:'Регистрация(r)', shortName:'r'},
    {id:5, name:'Налог(n)', shortName:'n'},
    {id:6, name:'Экзамен(e)', shortName:'e'},
]

export const NextTicketState=[
    {serviceId:1,shortName:'a',count:5},
    {serviceId:2,shortName:'b',count:4},
    {serviceId:3,shortName:'d',count:3},
    {serviceId:4,shortName:'r',count:4},
    {serviceId:5,shortName:'n',count:3},
    {serviceId:6,shortName:'e',count:5},
]

export const TicketQueueState={
    live:[
        {serviceId:1,shortName:'a',count:1},
        {serviceId:2,shortName:'b',count:1},
        {serviceId:3,shortName:'d',count:1},
        {serviceId:4,shortName:'r',count:1},
        {serviceId:5,shortName:'n',count:1},
        {serviceId:6,shortName:'e',count:1},

        {serviceId:1,shortName:'a',count:2},
        {serviceId:2,shortName:'b',count:2},
        {serviceId:3,shortName:'d',count:2},
        {serviceId:4,shortName:'r',count:2},
        {serviceId:5,shortName:'n',count:2},
        {serviceId:6,shortName:'e',count:2},


        {serviceId:1,shortName:'a',count:3},
        {serviceId:1,shortName:'a',count:4},
        {serviceId:2,shortName:'b',count:3},
        {serviceId:4,shortName:'r',count:3},
        {serviceId:6,shortName:'e',count:3},
        {serviceId:6,shortName:'e',count:4},

    ],
    online:[
        {serviceId:1,shortName:'a',count:14,time:'14:00'},
        {serviceId:2,shortName:'b',count:14,time:'14:00'},
        {serviceId:2,shortName:'b',count:15,time:'15:00'},
        {serviceId:3,shortName:'d',count:16,time:'16:00'},
    ]
}

export const WindowState=[
    {window:1, person:'',services:[],ticketNow:'', time:''},
    {window:2, person:'Ivanov',services:[1,2],ticketNow:'', time:'8:00-14:00'},
    {window:3, person:'Petrov',services:[3,4],ticketNow:'', time:'8:00-16:00'},
    {window:4, person:'Ibragimov',services:[5,6],ticketNow:'', time:'8:00-18:00'},
    {window:5, person:'',services:[],ticketNow:'', time:''},
    {window:6, person:'',services:[],ticketNow:'', time:''},
    {window:7, person:'Fadeeva',services:[2,3],ticketNow:'', time:'8:00-13:00'},
    {window:8, person:'Sidorova',services:[4,5],ticketNow:'', time:'8:00-16:00'},
    {window:9, person:'',services:[],ticketNow:'', time:''},
    {window:10, person:'',services:[],ticketNow:'', time:''},
]