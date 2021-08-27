import create from 'zustand';

const useStore = create(
    set => {
        setInterval(() => set((state: any) => ({ date: new Date() })), 1000);
        return ({ date: new Date() })
    })

export default useStore;
