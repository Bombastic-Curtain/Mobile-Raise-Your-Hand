//
//  ViewController.m
//  QueUp
//
//  Created by Cheng Tian on 5/31/15.
//  Copyright (c) 2015 Facebook. All rights reserved.
//

#import "ViewController.h"
#import "AppDelegate.h"
#import "NativeViewBridge.h"

#import <RCTBridge.h>
#import <RCTConvert.h>
#import "RCTEventDispatcher.h"




@interface ViewController ()
{
  id<SINClient> _client;
  id<SINCall> _call;
}
@end


@implementation ViewController

-(void)initSinchClient
{
  

  
  _client = [Sinch clientWithApplicationKey:@"dff6bf13-c7a3-4842-8a68-e4d34ecbc4da"
                          applicationSecret:@"ERG90kpgEEShyfV08XHSSw=="
                            environmentHost:@"sandbox.sinch.com"
                                     userId:userEmail];
                                        //userId:@"tonychen933@gmail.com"];
  _client.callClient.delegate = self;
  [_client setSupportCalling:YES];
  [_client start];
  [_client startListeningOnActiveConnection];
  
  
}
- (void)viewDidLoad {
  [super viewDidLoad];
  [self initSinchClient];
  // Do any additional setup after loading the view, typically from a nib.
}

- (void)didReceiveMemoryWarning {
  [super didReceiveMemoryWarning];
  // Dispose of any resources that can be recreated.
}


- (IBAction)call:(id)sender {
  NSLog(@"***** trying to call *****");
  NSLog(@"***** in here *****");
  // _call = [_client.callClient callUserWithId:@"<test>"];
  //        _call = [[_client callClient] callPhoneNumber:phoneNumber.text];
  //         _call = [[_client callClient] callUserWithId:@"<test>"];
  //
  //        [callButton setTitle:@"Hangup" forState:UIControlStateNormal];
  
}

- (IBAction)back:(id)sender {
  
  AppDelegate *appDelegate = (AppDelegate *)[[UIApplication sharedApplication] delegate];
  [appDelegate goToReactNative];
  ///---------------------
  [[NSNotificationCenter defaultCenter] postNotificationName:@"micEndedNotificaiton"
                                object:nil];
  //----------------------
}



-(void)client:(id<SINCallClient>)client didReceiveIncomingCall:(id<SINCall>)call
{
  NSLog(@"-----------------------------------");
  NSLog(@"-----------------------------------");
  NSLog(@"-----------------------------------");
  [call answer];
  
  
  
}






@end

