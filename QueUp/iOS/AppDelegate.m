/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

#import "AppDelegate.h"
#import "FBSDKCoreKit/FBSDKCoreKit.h"

#import "RCTRootView.h"
#import "RCTEventDispatcher.h"


@interface AppDelegate ()

@property (nonatomic, strong) UIViewController *reactNativeViewController;

@end

@implementation AppDelegate


- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  NSURL *jsCodeLocation;

  /**
   * Loading JavaScript code - uncomment the one you want.
   *
   * OPTION 1
   * Load from development server. Start the server from the repository root:
   *
   * $ npm start
   *
   * To run on device, change `localhost` to the IP address of your computer
   * (you can get this by typing `ifconfig` into the terminal and selecting the
   * `inet` value under `en0:`) and make sure your computer and iOS device are
   * on the same Wi-Fi network.
   */

  jsCodeLocation = [NSURL URLWithString:@"http://10.6.31.110:8081/index.ios.bundle"];

  /**
   * OPTION 2
   * Load from pre-bundled file on disk. To re-generate the static bundle
   * from the root of your project directory, run
   *
   * $ react-native bundle --minify
   *
   * see http://facebook.github.io/react-native/docs/runningondevice.html
   */

//   jsCodeLocation = [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];

  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                      moduleName:@"QueUp"
                                                   launchOptions:launchOptions];

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  
  /*
  UIViewController *rootViewController = [[UIViewController alloc] init];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  return YES;
  */
  
  // UIViewController *rootViewController = [[UIViewController alloc] init];
  self.reactNativeViewController = [[UIViewController alloc] init];
  self.reactNativeViewController.view = rootView;
  
  //rootViewController.view = rootView;
  self.window.rootViewController = self.reactNativeViewController;
  [self.window makeKeyAndVisible];
  return YES;
  
}

- (void)applicationDidBecomeActive:(UIApplication *)application {
  [FBSDKAppEvents activateApp];
}

- (void)goToReactNative {
  
  NSLog(@"***** call pressed *****");
  NSLog(@"***** call pressed *****");
  
  [self.window.rootViewController dismissViewControllerAnimated:TRUE completion:nil];
  
    
}

- (void)goNativeStoryboard {
  NSLog(@"***** call pressed *****");
  NSLog(@"***** call pressed *****");
  
  UIViewController *vc = [UIStoryboard storyboardWithName:@"Mic" bundle:nil].instantiateInitialViewController;
  
  [self.window.rootViewController presentViewController:vc animated:true completion:nil];
  
}




- (BOOL)application:(UIApplication *)application
            openURL:(NSURL *)url
  sourceApplication:(NSString *)sourceApplication
         annotation:(id)annotation {
  return [[FBSDKApplicationDelegate sharedInstance] application:application
                                                        openURL:url
                                              sourceApplication:sourceApplication
                                                     annotation:annotation];
}



@end
