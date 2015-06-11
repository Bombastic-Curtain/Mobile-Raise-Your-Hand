
//
//  ViewController.h
//  QueUp
//
//  Created by Cheng Tian on 5/31/15.
//  Copyright (c) 2015 Facebook. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <Sinch/Sinch.h>

#import <RCTBridge.h>
#import <RCTBridgeModule.h>


@interface ViewController : UIViewController <SINCallClientDelegate, SINCallDelegate>


- (IBAction)back:(id)sender;
- (IBAction)call:(id)sender;
@property UIImageView *loadingAnimation;
@property (weak, nonatomic) IBOutlet UIButton *done1;
@property (weak, nonatomic) IBOutlet UIButton *done2;


@end
