export const searchSlice = (set) => ({
  keyword: '',
  updateKeyword: (data) => set(() => ({ keyword: data })),
});
