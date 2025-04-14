'use client'
import type { FC } from 'react'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import ExploreContext from '@/context/explore-context'
import { useAppContext } from '@/context/app-context'
import { fetchMembers } from '@/service/common'
import type { InstalledApp } from '@/models/explore'
import Main from '@/app/components/explore/installed-app'
import { fetchInstalledAppList as doFetchInstalledAppList, uninstallApp, updatePinStatus } from '@/service/explore'

export type IInstalledAppProps = {
  params: Promise<{
    appId: string
  }>
}

const Explore: FC<IInstalledAppProps> = ({ params }) => {
  const resolvedParams = React.use(params) 
  const { t } = useTranslation()
  const router = useRouter()
  const [controlUpdateInstalledApps, setControlUpdateInstalledApps] = useState(0)
  const { userProfile, isCurrentWorkspaceDatasetOperator } = useAppContext()
  const [hasEditPermission, setHasEditPermission] = useState(false)
  const [installedApps, setInstalledApps] = useState<InstalledApp[]>([])
  const fetchInstalledAppList = async () => {
    const { installed_apps }: any = await doFetchInstalledAppList()
    setInstalledApps(installed_apps)
  }

  useEffect(() => {
    fetchInstalledAppList();
    document.title = `${t('explore.title')} - Dify`;
    (async () => {
      const { accounts } = await fetchMembers({ url: '/workspaces/current/members', params: {} })
      if (!accounts)
        return
      const currUser = accounts.find(account => account.id === userProfile.id)
      setHasEditPermission(currUser?.role !== 'normal')
    })()
  }, [])

  useEffect(() => {
    if (isCurrentWorkspaceDatasetOperator)
      return router.replace('/datasets')
  }, [isCurrentWorkspaceDatasetOperator])

  return (
    <div className='flex h-full overflow-hidden border-t border-divider-regular bg-background-body'>
      <ExploreContext.Provider
        value={
          {
            controlUpdateInstalledApps,
            setControlUpdateInstalledApps,
            hasEditPermission,
            installedApps,
            setInstalledApps,
          }
        }
      >
        <div className='w-0 grow'>
          <Main id='6431d12c-b7ba-4e81-bc0e-b2d8deb35907' />
        </div>
      </ExploreContext.Provider>
    </div>
  )
}
export default React.memo(Explore)
