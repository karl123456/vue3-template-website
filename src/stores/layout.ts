import { defineStore } from 'pinia';

type CTViewportType = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'xxxl';

interface LayoutState {
  sidebarCollapsed: boolean;
  sidebarVisible: boolean;
  viewportType: CTViewportType;
  viewportSize: number;
  loading: boolean;
  loadingMessage: string;
}

function getViewport(): [number, CTViewportType] {
  const width = window.innerWidth;
  if (width >= 2000) {
    return [width, 'xxxl'];
  }
  if (width >= 1600) {
    return [width, 'xxl'];
  }
  if (width >= 1200) {
    return [width, 'xl'];
  }
  if (width >= 992) {
    return [width, 'lg'];
  }
  if (width >= 768) {
    return [width, 'md'];
  }
  if (width >= 576) {
    return [width, 'sm'];
  }
  return [width, 'xs'];
}

export const useLayoutStore = defineStore({
  id: 'layout',
  state: (): LayoutState => {
    const viewport = getViewport();
    const state = {
      viewportSize: viewport[0],
      viewportType: viewport[1],
      sidebarCollapsed: false,
      sidebarVisible: true,
      loading: false,
      loadingMessage: '',
    };
    return state;
  },
  getters: {},
  actions: {
    updateViewportSize() {
      const [size, type] = getViewport();
      this.viewportSize = size;
      this.viewportType = type;
    },
    toggleCollapsed(collapsed?: boolean) {
      this.sidebarCollapsed =
        typeof collapsed === 'boolean' ? collapsed : !this.sidebarCollapsed;
    },
    toggleHidden(hidden?: boolean) {
      this.sidebarVisible =
        typeof hidden === 'boolean' ? hidden : !this.sidebarVisible;
    },
    toggleLoading(loading?: boolean, message?: string) {
      this.loading = typeof loading === 'boolean' ? loading : !this.loading;
      if (this.loading) {
        this.loadingMessage = message || '';
      }
    },
  },
});
