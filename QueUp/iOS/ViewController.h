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


@interface ViewController : UIViewController <SINCallClientDelegate>

@property (weak, nonatomic) IBOutlet UIButton *callButton;
@property (weak, nonatomic) IBOutlet UIButton *BackToReact;
- (IBAction)back:(id)sender;
- (IBAction)call:(id)sender;

@end
