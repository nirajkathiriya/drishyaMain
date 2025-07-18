import React from 'react';
import { Button } from '../ui/Button';
import { Card, CardContent } from '../ui/Card';
import { Avatar, PricingPlan } from '../../types';

interface SummaryData {
  type: string;
  orientation: string;
  tone: string;
  avatar: Avatar | null;
  plan: PricingPlan | null;
  needsScriptHelp: boolean;
  attachedFiles: File[];
  totalPrice: number;
}

interface OrderSummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  data: SummaryData;
}

export function OrderSummaryModal({ isOpen, onClose, onConfirm, data }: OrderSummaryModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="glass-dark rounded-2xl p-6 w-full max-w-md">
        <h3 className="text-xl font-bold text-white mb-4 text-center">Confirm Your Order</h3>
        <Card className="card-professional mb-4">
          <CardContent className="p-4 space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">Video Type</span>
              <span className="text-white capitalize">{data.type.replace('-', ' ')}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Orientation</span>
              <span className="text-white capitalize">{data.orientation}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Tone</span>
              <span className="text-white capitalize">{data.tone}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Avatar</span>
              <span className="text-white">{data.avatar?.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Plan</span>
              <span className="text-white">{data.plan?.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Script</span>
              <span className="text-white">{data.needsScriptHelp ? 'Writing Service' : 'Provided'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Files</span>
              <span className="text-white">{data.attachedFiles.length}</span>
            </div>
            <div className="border-t border-gray-700 pt-3 flex justify-between">
              <span className="font-bold text-white">Total</span>
              <span className="font-black text-green-400">${data.totalPrice}</span>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end space-x-3">
          <Button variant="outline" onClick={onClose} className="glass border-white/20 text-white hover:bg-white/10">
            Cancel
          </Button>
          <Button onClick={onConfirm} className="btn-professional bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
            Confirm Order
          </Button>
        </div>
      </div>
    </div>
  );
}
