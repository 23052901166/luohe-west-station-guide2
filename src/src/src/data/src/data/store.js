import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import luohe from './luohe.json'

const defaultStation = luohe.Stations?.[0] ?? {
  Name: "漯河西站",
  WaitingAreas: [],
  TrainStops: [],
  Platforms: []
}

export const useStationStore = create(
  persist(
    (set, get) => ({
      station: defaultStation,

      updateStationName: (name) => set(state => ({
        station: { ...state.station, Name: name }
      }),

      updateTrain: (index, patchData) => set(state => {
        const trainList = [...state.station.TrainStops]
        trainList[index] = { ...trainList[index], ...patchData }
        return { station: { ...state.station, TrainStops: trainList }
      }),

      addTrain: () => set(state => ({
        station: {
          ...state.station,
          TrainStops: [...state.station.TrainStops, {
            Number: "G0000",
            ArrivalTime: "00:00:00",
            DepartureTime: "00:05:00",
            Status: "00:00:00",
            TicketCheckIds: [],
            Origin: "始发站",
            Terminal: "终点站",
            Platform: "1",
            Landmark: "蓝色",
            Length: 16
          }]
        }
      })),

      deleteTrain: (idx) => set(state => {
        const newList = state.station.TrainStops.filter((_, i) => i !== idx)
        return { station: { ...state.station, TrainStops: newList }
      }),

      getPlatformScreens: () => {
        const { Platforms, TrainStops } = get().station
        return Platforms.map(platform => {
          const matchTrain = TrainStops.find(t => t.Platform === platform.Name)
          return { platform, train: matchTrain }
        })
      }
    }),
    {
      name: "luohe-station-storage",
    }
  )
)
