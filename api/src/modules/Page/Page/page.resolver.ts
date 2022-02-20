import {Resolver, ResolveField, Parent, Args, Query} from '@nestjs/graphql';

// services
import {PageService} from './page.service';
import {GqlWorkspaceId} from 'src/core';
import {Workspace} from 'src/modules/Workspace/interfaces';
import {FilemetaService} from 'src/modules/File/FileMeta';

// guards
@Resolver('Page')
export class PageResolver {
  constructor(
    private readonly pageService: PageService,
    private readonly fileMetaService: FilemetaService
  ) {}

  @Query()
  async pageByPath(@Args('path') path: string) {
    return this.pageService.findByPath(path);
  }

  @Query()
  async pagesByPath(@Args('paths') paths: string[]) {
    return this.pageService.findByPaths(paths);
  }

  @Query()
  async pageSeo(@Args('path') path: string, @GqlWorkspaceId() workspaceId) {
    // isSeo always true for the path
    return this.pageService.findByPath(path, workspaceId, true);
  }

  @Query()
  async page(@Args('id') id: string) {
    return this.pageService.findById(id);
  }

  @Query()
  public async getSitemap() {
    return this.pageService.getSitemap();
  }

  @Query()
  public async getPaths() {
    const paths = await this.pageService.getSitemap();
    return paths.map(({path}) => path);
  }

  @ResolveField('layout')
  async getLayout(@Parent() page) {
    return this.pageService.findById(page.layout);
  }

  @ResolveField('preview')
  async getPreview(@Parent() page) {
    return page?.fileMeta
      ? this.fileMetaService.findById(page?.fileMeta)
      : null;
  }

  @ResolveField('workspace')
  async getWorkspace(@Parent() page) {
    let workspace: Workspace;
    if (page?.workspace) {
      const {workspace: popWorkspace} = await this.pageService._populate(page, [
        'workspace'
      ]);
      workspace = popWorkspace;
    } else {
      workspace = null;
    }
    return workspace;
  }
}
