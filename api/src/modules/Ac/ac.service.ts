// npm
import {ObjectId} from 'mongodb';
import {Injectable} from '@nestjs/common';
import {isAclActionAllow} from './utils';
import {GroupService} from './Group/group.service';
import {PolicyService} from './Policy/policy.service';
import {Policy} from './Policy/interfaces';
import {Group} from './Group';

@Injectable()
export class ACService {
  constructor(
    private readonly groupService: GroupService,
    private readonly policyService: PolicyService
  ) {}

  async addUserToAcGroups(userId: string, groups: string[]): Promise<Group[]> {
    return this.groupService.addUserToGroups(userId, groups);
  }

  async removeUserFromAcGroups(
    userId: string,
    groups: string[]
  ): Promise<Group[]> {
    return this.groupService.removeUserFromGroups(userId, groups);
  }

  async areAllowed(
    workspace: string,
    userId: string,
    actions: string[]
  ): Promise<boolean> {
    const allowedActions = await this.getUserAllowedActions(workspace, userId);
    const deniedActions = await this.getUserDeniedActions(workspace, userId);
    const UserActions = {
      allows: allowedActions,
      denies: deniedActions
    };
    const isAllowed = isAclActionAllow(actions, UserActions);
    return isAllowed;
  }

  async isAllowed(
    workspace: string,
    userId: string,
    action: string
  ): Promise<boolean> {
    return this.areAllowed(workspace, userId, [action]);
  }
  async getUserAllowedActions(
    workspace: string,
    userId: string
  ): Promise<string[]> {
    const groupDocs = await this.groupService.find({
      workspace: workspace,
      users: [userId]
    });
    if (!groupDocs) return [];
    const policyIdArrays = (groupDocs || []).map(group => group.policies);
    const policyIds = (policyIdArrays || []).reduce(
      (arr, n) => [...arr, ...n],
      []
    );
    const policyDocs = await this.policyService.find({_ids: policyIds});
    // get all statement.action allows and denies(not now)
    const policyStatementArray = (policyDocs || []).map(
      policy => policy.Statement
    );
    const policyStatements = (policyStatementArray || []).reduce(
      (arr, n) => [...arr, ...n],
      []
    );
    const allowedStatements = (policyStatements || []).filter(
      statement => statement.Effect === 'Allow'
    );
    const allowedActionArray = (allowedStatements || []).map(
      statement => statement.Action
    );
    const allowedActions = (allowedActionArray || []).reduce(
      (arr, n) => [...arr, ...n],
      []
    );
    return allowedActions;
  }
  async getUserDeniedActions(
    workspace: string,
    userId: string
  ): Promise<string[]> {
    const groupDocs = await this.groupService.find({
      workspace: workspace,
      users: [userId]
    });
    if (!groupDocs) return [];
    const policyIdArrays = (groupDocs || []).map(group => group.policies);
    const policyIds = (policyIdArrays || []).reduce(
      (arr, n) => [...arr, ...n],
      []
    );
    const policyDocs = await this.policyService.find({_ids: policyIds});
    // get all statement.action allows and denies(not now)
    const policyStatementArray = (policyDocs || []).map(
      policy => policy.Statement
    );
    const policyStatements = (policyStatementArray || []).reduce(
      (arr, n) => [...arr, ...n],
      []
    );
    const deniedStatements = (policyStatements || []).filter(
      statement => statement.Effect === 'Deny'
    );
    const deniedActionArray = (deniedStatements || []).map(
      statement => statement.Action
    );
    const deniedActions = (deniedActionArray || []).reduce(
      (arr, n) => [...arr, ...n],
      []
    );
    return deniedActions;
  }

  async getPoliciesByActions(
    actions: string[],
    conditions: any
  ): Promise<Policy[]> {
    const {workspaceAccessFilter = true, workspaceTypesFilter = true} =
      conditions;

    // fetch all policies by requested actions
    return this.policyService.findPolicies({
      Statement: {$elemMatch: {Effect: 'Allow', Action: {$in: actions}}},
      workspaceAccessFilter,
      workspaceTypesFilter
    });
  }

  async getGroupsByPolicies(policies: string[]): Promise<Group[]> {
    // fetch all groups by requested policies
    return this.groupService.findGroups({policies: {$in: policies}});
  }

  async getGroupsByActions(actions: string[]): Promise<Group[]> {
    // fetch all policies related to the actions
    const policies = await this.getPoliciesByActions(actions, {});
    // then fetch all groups based on policy ids
    const groups = await this.getGroupsByPolicies(
      policies.map(p => p._id.toString())
    );
    return groups;
  }

  async getUserIdsByActions(actions: string[]): Promise<string[]> {
    // get all groups by the actions
    const groups = await this.getGroupsByActions(actions);
    // return a unique array of user ids from groups[].users
    return [
      ...new Set(
        groups.reduce<string[]>((arr, group) => {
          arr = arr.concat(group.users?.map(u => u.toHexString()));
          return arr;
        }, [])
      )
    ];
  }
}
