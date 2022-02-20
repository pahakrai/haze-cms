import getConfig from "next/config";

const { publicRuntimeConfig: Config } = getConfig();

const _verifyUser = function (
  { input, disableInput, contactMethod, sendImmediately, token }: any,
  cb: any
): Promise<IUser> {
  return new Promise<IUser>((resolve: (user: IUser) => void, reject: any) => {
    // user not yet verified phone
    cb({
      input,
      token,
      disableInput,
      contactMethod,
      sendImmediately,
      onDone: async (updatedUser: IUser) => {
        // NOTE: currently return nothing
        // notify main stream that this is completed
        resolve(updatedUser);
      },
      onCancel: async () => {
        reject();
      }
    });
  });
};

export const verifyUser = async (
  user: IUser,
  token: IToken,
  config: {
    params: { [key: string]: any };
    verifiedRequirements: Array<string>;
    required: boolean;
    forceVerify: boolean;
  },
  goToVerifyUser: any
) => {
  if (
    (Config.LOGIN_REQUIRE_USER_VERIFICATION !== undefined &&
      Config.LOGIN_REQUIRE_USER_VERIFICATION) ||
    (Config.LOGIN_REQUIRE_USER_VERIFICATION === undefined && config?.required)
  ) {
    // NOTE: test scenarios
    // verifiedRequirements = ['phone', 'email']
    // phone true
    // email false
    // isVerified false

    // phone true
    // email true
    // isVerified false
    if (
      config?.verifiedRequirements?.includes("phone") &&
      (!user?.verified?.phone || config?.forceVerify)
    ) {
      user = await _verifyUser(
        {
          disableInput: true,
          input: user?.phone,
          contactMethod: "phoneVerify",
          sendImmediately: false,
          token
        },
        goToVerifyUser
      );
    }
    if (
      config?.verifiedRequirements?.includes("email") &&
      (!user?.verified?.email || config?.forceVerify)
    ) {
      user = await _verifyUser(
        {
          disableInput: true,
          input: user?.email,
          contactMethod: "emailVerify",
          sendImmediately: false,
          token
        },
        goToVerifyUser
      );
    }

    // if user is not verified and some verifiedRequirements are not
    // fulfilled. This usually does not happen, but if on the case of:
    //    - all verifiedRequirements true
    //    - isVerified false
    // then we force a verifyRequirement to check again in hope that it'll
    // update isVerified to true
    if (!user?.isVerified) {
      if (!config?.verifiedRequirements?.length) {
        // throw new Error("Required Verification Field Not Provided");
        // NOTE: as the application might not have requirements so still
        // can proceed the verify flow even if user is not verified
        return user;
      }
      // go through this verify process again, this time
      // forcing user to verify the first verifiedRequirement
      // even if field for that user is already verified
      user = await verifyUser(
        user,
        token,
        {
          ...config,
          verifiedRequirements: [config?.verifiedRequirements[0]],
          forceVerify: true
        },
        goToVerifyUser
      );
    }
  }
  return user;
};
