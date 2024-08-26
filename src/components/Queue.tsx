import styled from "styled-components";
import {useEffect, useState} from "react";
import {NextTicketState, ServiceState, TicketQueueState, WindowState} from "./InitState";


export interface ITicketQueueId{
    serviceId:number,
    shortName:string,
    count:number,
    time?:string,
}
export const Queue = () => {

    const [selectedService, setSelectedService]=useState<
        {id:number, name:string, shortName:string} | null>()
    const services=ServiceState;


    const [nextTicket, setNextTicket]=useState<ITicketQueueId[]>(NextTicketState)

    const [ticketsQueue, setTicketsQueue]=useState<
        {live:ITicketQueueId[], online:ITicketQueueId[]}>(TicketQueueState)

    const [windowQueue, setWindowQueue]=useState<
        {window:number,person:string,services:Array<number>,ticketNow:string, time:string}[]>(WindowState)

    const [time, setTime]=useState<string>('13:00')
    const [phone, setPhone]=useState<string>('')
    const addTickets=(id:number)=>{
        const liveTickets=ticketsQueue.live;
        const onlineTickets=ticketsQueue.online;
        let nowNumberTicket:ITicketQueueId;
        const newArr:ITicketQueueId[]=[];
        nextTicket.forEach((item)=>{
            if(item.serviceId===id){
                nowNumberTicket=item;
                newArr.push({serviceId:item.serviceId,shortName:item.shortName,count:item.count+1})
            }else{
                newArr.push(item)
            }
        })
        // @ts-ignore
        if(nowNumberTicket?.serviceId){
            liveTickets.push({serviceId:nowNumberTicket.serviceId,shortName:nowNumberTicket.shortName,count:nowNumberTicket.count})
        }
        setTicketsQueue({live:liveTickets,online:onlineTickets})

        setNextTicket(newArr)
        setSelectedService(null);
    }
    function updateQueue(){
        let newArrWindow=windowQueue;
        let newTicketQueue=ticketsQueue.live;

        if(newTicketQueue.length!==0){
            let indexQueue=0;
            let maxIndexQueue=newTicketQueue.length-1;
            windowQueue.forEach((item,index)=>{
                if(item.person!=='' && item.ticketNow===''){
                    while(indexQueue<=maxIndexQueue){
                        const shure= item.services.includes(newTicketQueue[indexQueue]?.serviceId)
                        if(shure){
                            const nTQ=newTicketQueue[indexQueue]
                            newArrWindow[index]={...item,ticketNow:`${nTQ?.time?'g':''}${nTQ.shortName}-${nTQ.count}`};
                            newTicketQueue.splice(indexQueue,1)
                            indexQueue=maxIndexQueue+1;
                        }else{
                            indexQueue++;
                        }
                    }
                    indexQueue=0;
                }
            })
            setTicketsQueue({...ticketsQueue,live:newTicketQueue});
            setWindowQueue(newArrWindow);
        }
    }

    useEffect(() => {
        updateQueue();
    }, []);

    useEffect(() => {
        updateQueue();
    }, [windowQueue,nextTicket]);

    useEffect(() => {
        if(time!==''){
            const newArrLive:ITicketQueueId[]=[];
            const newArrLineWithOnline:ITicketQueueId[]=[]
            const arrOnlineForLive:ITicketQueueId[]=[];
            const newArrOnline:ITicketQueueId[]=[];
            ticketsQueue.live.forEach((item)=>{
                if(item?.time){
                    newArrLineWithOnline.push(item)
                }
                else{
                    newArrLive.push(item)
                }
            })
            ticketsQueue.online.forEach((item)=>{
                if(item.time===time){
                    arrOnlineForLive.push(item)
                }else{
                    newArrOnline.push(item)
                }
            })

            if(arrOnlineForLive.length!==0){
                const reversedArray=arrOnlineForLive.reverse()
                reversedArray.forEach((item)=>{
                    newArrLive.unshift(item)
                })
            }
            if(newArrLineWithOnline.length!==0){
                const reversedArray2:ITicketQueueId[]=newArrLineWithOnline.reverse()
                reversedArray2.forEach((item)=>{
                    newArrLive.unshift(item)
                })
            }
            setTicketsQueue({live:newArrLive,online:newArrOnline})
        }
    }, [time]);

    const deleteTicket=(window:number)=>{
        const newArr:{window:number,person:string,services:Array<number>,ticketNow:string, time:string}[]=[];
        windowQueue.forEach((item)=>{
            if(item.window===window){
                newArr.push({...item,ticketNow:''})
            }else{
                newArr.push(item)
            }
        })
        setWindowQueue(newArr);
    }

    return (
        <WindowPage>
            <HeaderBlock>
                <Services>
                    <div>Выберите услугу:</div>
                    <ItemsService>
                        {services.map((item)=>
                            <Service
                                style={{backgroundColor: selectedService?.id===item.id ? 'lightgreen' : 'white'}}
                                onClick={()=>setSelectedService(item)}
                            >{item.name}</Service>
                        )}
                    </ItemsService>
                    <TimeInput>
                        Ведите номер телефона (необязательно):
                        <input value={phone} onChange={e => setPhone(e.target.value)}/>
                    </TimeInput>
                    <ButtonService onClick={()=>{
                        if(selectedService?.id) {
                            addTickets(selectedService?.id);
                            setPhone('');
                        }
                    }}>Подтвердить услугу</ButtonService>
                </Services>
                <TimeBlock>
                    Время:
                    <TimeInput>
                        <input value={time} onChange={e => setTime(e.target.value)}/>
                    </TimeInput>
                </TimeBlock>
            </HeaderBlock>

            <Body>
                <WindowBlock>
                    Окна:
                    <PersonWindows>
                        {windowQueue.map((item)=>
                            <PersonWindow>
                                <PersonFio style={{backgroundColor:item.person?'lightgreen':'red'}}>
                                    {item.person}
                                    {item.person ? `(${item.services.map((el)=>services.find((ser)=>ser.id===el)?.shortName)})` :''}
                                </PersonFio>
                                <FirstBlock>
                                    <PersonTime>{item.time}</PersonTime>
                                    <PersonWorkWindow>{item.window}</PersonWorkWindow>
                                </FirstBlock>
                                <TicketWindow>{item.ticketNow}</TicketWindow>
                                <DeleteTicket onClick={()=>deleteTicket(item.window)}>{item.person ? 'Освободить место' : ''}</DeleteTicket>
                            </PersonWindow>
                        )}
                    </PersonWindows>
                </WindowBlock>

                <TicketsQueue>
                    <ColumnTicket>
                        Талоны:
                        {ticketsQueue?.live.map((item)=>
                            <div>{item.time?'g':''}{item.shortName}-{item.count}</div>
                        )}
                    </ColumnTicket>
                    <ColumnTicket>
                        Госуслуги:
                        {ticketsQueue?.online.map((item)=>
                            <div>{item.time?'g':''}{item.shortName}-{item.count}</div>
                        )}
                    </ColumnTicket>

                </TicketsQueue>

            </Body>

        </WindowPage>
    );
};


const WindowPage = styled.div`
  padding: 15px;
`;
const DefaultBorder=styled.div`
  border: 2px solid black;
  padding: 10px;
`;
const Services = styled(DefaultBorder)`
  width:100%
`;
const ItemsService = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
  height: 40px;
`;

const Service = styled.div`
  width: 100%;
  border: 1px solid black;
  border-radius: 5px;
  align-items: center;
  display: flex;
  justify-content: center;
  cursor: pointer;
`;
const ButtonService = styled.div`
  border: 1px solid black;
  border-radius: 5px;
  background-color: deepskyblue;
  width: 300px;
  height: 30px;
  margin: 10px auto 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
const Body = styled.div`
 display: flex;
  gap:15px;
  margin-top: 15px;
`;
const WindowBlock = styled(DefaultBorder)`
    width: 100%;
`;

const PersonWindows = styled.div`
    width: 100%;
  display: flex;
  gap: 25px;
  margin-top: 15px;
  flex-wrap: wrap;
`;
const TicketsQueue = styled(DefaultBorder)`
 display: flex;
`;
const TimeBlock=styled(DefaultBorder)`
 width:200px;
`;
const ColumnTicket = styled.div`
  width:100px;
`;
const PersonWindow = styled.div`
  width:200px;
  height: 100px;
  border: 1px solid black;
  border-radius: 5px;
`;
const PersonFio = styled.div`
  border-bottom: 1px solid black;
  height: 20px;
`;
const FirstBlock = styled.div`
  display: flex;
  border-bottom: 1px solid black;
  justify-content: space-between;
`;
const PersonTime = styled.div`
  margin-left: 10px;
`;
const PersonWorkWindow = styled.div`
  border-left: 1px solid black;
  width: 20px;
`;
const TicketWindow = styled.div`
  height: 40px;
`;
const DeleteTicket = styled.div`
  border-top: 1px solid black;
  cursor: pointer;
`;
const HeaderBlock=styled.div`
  display: flex;
  gap:15px;
`
const TimeInput=styled.div`
  margin-top: 20px;
`
