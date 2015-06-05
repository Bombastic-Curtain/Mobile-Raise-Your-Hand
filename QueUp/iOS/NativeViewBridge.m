//
//  NativeViewBridge.m
//  QueUp
//
//  Created by Cheng Tian on 5/31/15.
//  Copyright (c) 2015 Facebook. All rights reserved.
//


#import <RCTBridge.h>
#import <RCTConvert.h>
#import "NativeViewBridge.h"
#import "RCTEventDispatcher.h"



#import "AppDelegate.h"

NSString * userEmail;

@implementation NativeViewBridge

@synthesize bridge = _bridge;

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(goToNative){
  AppDelegate *appDelegate = (AppDelegate *)[[UIApplication sharedApplication] delegate];
  [appDelegate goNativeStoryboard];
}

RCT_EXPORT_METHOD(addEmail:(NSString *)currentUserEmail){
  userEmail = currentUserEmail;
  NSLog(@"%@", userEmail);
  
  //================ Adding observer to listen for the "micEndedNotificaiton" =======
  //================ we should remove this somewhere , dealloc =======

  [[NSNotificationCenter defaultCenter] addObserver:self
                                        selector:@selector(micEndedEvent:)
                                        name:@"micEndedNotificaiton"
                                        object:nil];
  
  [[NSNotificationCenter defaultCenter] addObserver:self
                                        selector: @selector(callEstablishedEvent:)
                                        name:@"callEstablishedNotification"
                                        object:nil];

  
}



- (void)micEndedEvent:(NSNotification *)notification {
  
  NSLog(@"***** mic end event pressed *****");
  NSLog(@"***** mic end event pressed *****");
//  NSString *eventName = notification.userInfo[@"name"];
//  [self.bridge.eventDispatcher sendAppEventWithName:@"EventReminder"
//                                               body:@{@"name": eventName}];
  NSLog(@"%@", self.bridge);
//  
  [self.bridge.eventDispatcher sendDeviceEventWithName:@"MicEndedEvent"
                                              body:nil];
}

- (void) callEstablishedEvent: (NSNotification *) notification {
  NSLog(@"Call Esatablished Event");
  [self.bridge.eventDispatcher sendDeviceEventWithName:@"CallEstablishedEvent"
                                                  body: nil];
}






@end
