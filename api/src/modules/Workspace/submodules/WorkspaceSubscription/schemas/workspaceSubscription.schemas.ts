import {Schema as MongooseSchema, SchemaTypes} from 'mongoose';

export const CollectionName = 'WorkspaceSubscriptions';
export const Schema = new MongooseSchema(
  {
    workspace: {type: SchemaTypes.ObjectId, required: true, ref: 'Workspaces'},
    // stripe subscription id, ref: https://stripe.com/docs/billing/subscriptions/upgrade-downgrade
    stripeSubscriptionId: {
      type: SchemaTypes.String,
      required: false,
      match: /^sub_/
    },
    // subscription status (following stripe subscription.status)
    status: {
      type: SchemaTypes.String,
      default: 'unpaid',
      enum: [
        'active',
        'unpaid',
        'canceled',
        'past_due',
        'trialing',
        'incomplete',
        'incomplete_expired'
      ]
    },
    // plan currently use
    subscriptionPlan: {
      required: true,
      ref: 'SubscriptionPlans',
      type: SchemaTypes.ObjectId
    }
  },
  {
    collection: CollectionName,
    timestamps: true
  }
);
