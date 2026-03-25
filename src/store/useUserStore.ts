import { create } from 'zustand'

type Store = {
  data: any
  setData: (data: any) => void
  removeData: () => void
}

export const useUserStore = create<Store>()((set) => ({
  data: null,
  setData: (data: any) => set({ data }),
  removeData:()=>(set({ data: null }))
}))

