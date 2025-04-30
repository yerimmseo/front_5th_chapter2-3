import { create } from "zustand"

const useControlStore = create((set, get) => ({
  showAddDialog: false,
  showEditDialog: false,
  showAddCommentDialog: false,
  showEditCommentDialog: false,
  showPostDetailDialog: false,
  showUserModal: false,

  searchQuery: "",
  sortBy: "",
  sortOrder: "",
  selectedTag: "",
  skip: 0,
  limit: 10,

  // Dialog나 Modal 하나만 뜰꺼라서 상태 하나로 합치고 case 나눠도 될 것 같음
  setShowAddDialog: (show) => set({ showAddDialog: show }),
  setShowEditDialog: (show) => set({ showEditDialog: show }),
  setShowAddCommentDialog: (show) => set({ showAddCommentDialog: show }),
  setShowEditCommentDialog: (show) => set({ showEditCommentDialog: show }),
  setShowPostDetailDialog: (show) => set({ showPostDetailDialog: show }),
  setShowUserModal: (show) => set({ showUserModal: show }),

  // 테이블 정렬, 검색도 store말고 다른 방법으로..
  setSearchQuery: (query) => set({ searchQuery: query }),
  setSortBy: (sortBy) => set({ sortBy }),
  setSortOrder: (sortOrder) => set({ sortOrder }),
  setSelectedTag: (tag) => set({ selectedTag: tag }),
  setSkip: (skip) => set({ skip }),
  setLimit: (limit) => set({ limit }),

  setStateFormQuery: (queryParams) => {
    set({
      skip: parseInt(queryParams.get("skip") || "0"),
      limit: parseInt(queryParams.get("limit") || "10"),
      searchQuery: queryParams.get("search") || "",
      sortBy: queryParams.get("sortBy") || "",
      sortOrder: queryParams.get("sortOrder") || "asc",
      selectedTag: queryParams.get("tag") || "",
    })
  },
}))

export default useControlStore
