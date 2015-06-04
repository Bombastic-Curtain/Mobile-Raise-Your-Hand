//
//  NativeViewBridge.h
//  QueUp
//
//  Created by Cheng Tian on 5/31/15.
//  Copyright (c) 2015 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <RCTBridge.h>
#import <RCTBridgeModule.h>

@interface NativeViewBridge : NSObject <RCTBridgeModule>


extern NSString *userEmail;
- (void)micEndedEvent;
- (void)micEndedEventCall;



@end
