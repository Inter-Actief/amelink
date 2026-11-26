import { useQuery } from '@/composables/queries'

/**
 * The homepage blocks (news, publications, video) all read from the same
 * `Homepage` operation. Sharing one frozen `today` variable keeps them on a
 * single cache entry, so the page issues one request instead of one per block.
 */
const today = new Date().toISOString()

export const useHomepageContent = () => useQuery('homepage', { today })
