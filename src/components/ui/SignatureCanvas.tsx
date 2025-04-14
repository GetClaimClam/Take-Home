import React, { useRef, useEffect, useState, useCallback } from "react";

interface SignatureCanvasProps {
    onChange?: (signatureData: string) => void;
    width?: number;
    height?: number;
    className?: string;
    initialValue?: string;
    required?: boolean;
    disabled?: boolean;
}

export const SignatureCanvas: React.FC<SignatureCanvasProps> = ({
    onChange,
    width = 560,
    height = 200,
    className = "",
    initialValue,
    required = false,
    disabled = false,
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
    const lastDrawnValue = useRef<string | null>(null);
    const hasDrawnSomething = useRef<boolean>(false);
    const lastPosition = useRef<{ x: number; y: number } | null>(null);
    const isOutside = useRef<boolean>(false);
    const [isTouchDevice] = useState<boolean>("ontouchstart" in window);
    const touchTimeout = useRef<ReturnType<typeof setTimeout>>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas) {
            const context = canvas.getContext("2d", {
                willReadFrequently: true,
                alpha: true,
            });
            if (context) {
                context.lineWidth = 2;
                context.lineCap = "round";
                context.strokeStyle = "#000";
                context.imageSmoothingEnabled = true;
                context.imageSmoothingQuality = "high";
                setCtx(context);
            }
        }
    }, []);

    useEffect(() => {
        if (
            ctx &&
            canvasRef.current &&
            initialValue !== lastDrawnValue.current
        ) {
            ctx.clearRect(
                0,
                0,
                canvasRef.current.width,
                canvasRef.current.height
            );

            if (initialValue) {
                const img = new Image();
                img.onload = () => {
                    ctx.drawImage(img, 0, 0);
                    lastDrawnValue.current = initialValue;
                    hasDrawnSomething.current = true;
                };
                img.onerror = () => {
                    console.error("Failed to load signature image");
                    lastDrawnValue.current = null;
                    hasDrawnSomething.current = false;
                    if (onChange) {
                        onChange("");
                    }
                };
                img.src = initialValue;
            } else {
                lastDrawnValue.current = null;
                hasDrawnSomething.current = false;
            }
        }
    }, [ctx, initialValue, onChange]);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const preventDefault = (e: TouchEvent) => {
            if (isDrawing) {
                e.preventDefault();
            }
        };

        container.addEventListener("touchstart", preventDefault, {
            passive: false,
        });
        container.addEventListener("touchmove", preventDefault, {
            passive: false,
        });
        container.addEventListener("touchend", preventDefault, {
            passive: false,
        });

        return () => {
            container.removeEventListener("touchstart", preventDefault);
            container.removeEventListener("touchmove", preventDefault);
            container.removeEventListener("touchend", preventDefault);
        };
    }, [isDrawing]);

    const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
        if (disabled) return;

        setIsDrawing(true);
        isOutside.current = false;
        const { offsetX, offsetY } = getCoordinates(e);
        lastPosition.current = { x: offsetX, y: offsetY };

        if (ctx) {
            ctx.beginPath();
            ctx.moveTo(offsetX, offsetY);
            // Add a dot at the start point for better visual feedback
            ctx.arc(offsetX, offsetY, ctx.lineWidth / 2, 0, Math.PI * 2);
            ctx.fill();
        }

        // Clear any existing touch timeout
        if (touchTimeout.current) {
            clearTimeout(touchTimeout.current);
        }
    };

    const draw = (e: React.MouseEvent | React.TouchEvent) => {
        if (!isDrawing || disabled) return;

        hasDrawnSomething.current = true;
        const { offsetX, offsetY } = getCoordinates(e);

        if (ctx) {
            if (isOutside.current) {
                ctx.beginPath();
                ctx.moveTo(offsetX, offsetY);
                isOutside.current = false;
            } else if (lastPosition.current) {
                const midPoint = {
                    x: (lastPosition.current.x + offsetX) / 2,
                    y: (lastPosition.current.y + offsetY) / 2,
                };

                ctx.quadraticCurveTo(
                    lastPosition.current.x,
                    lastPosition.current.y,
                    midPoint.x,
                    midPoint.y
                );
                ctx.stroke();
                ctx.beginPath();
                ctx.moveTo(midPoint.x, midPoint.y);
            }
        }

        lastPosition.current = { x: offsetX, y: offsetY };

        if (touchTimeout.current) {
            clearTimeout(touchTimeout.current);
        }
    };

    const handleMouseLeave = () => {
        if (isDrawing) {
            isOutside.current = true;
        }
    };

    const stopDrawing = useCallback(() => {
        if (disabled) return;

        setIsDrawing(false);
        isOutside.current = false;
        lastPosition.current = null;

        if (onChange && canvasRef.current) {
            if (isTouchDevice) {
                touchTimeout.current = setTimeout(() => {
                    const newValue = canvasRef.current?.toDataURL();
                    if (newValue && newValue !== lastDrawnValue.current) {
                        lastDrawnValue.current = newValue;
                        onChange(hasDrawnSomething.current ? newValue : "");
                    }
                }, 50);
            } else {
                const newValue = canvasRef.current.toDataURL();
                if (newValue !== lastDrawnValue.current) {
                    lastDrawnValue.current = newValue;
                    onChange(hasDrawnSomething.current ? newValue : "");
                }
            }
        }
    }, [onChange, isTouchDevice, disabled]);

    const getCoordinates = (e: React.MouseEvent | React.TouchEvent) => {
        if (canvasRef.current) {
            const rect = canvasRef.current.getBoundingClientRect();
            const scaleX = canvasRef.current.width / rect.width;
            const scaleY = canvasRef.current.height / rect.height;

            if ("touches" in e) {
                const touch = e.touches[0];
                const x = (touch.clientX - rect.left) * scaleX;
                const y = (touch.clientY - rect.top) * scaleY;
                return {
                    offsetX: Math.round(x),
                    offsetY: Math.round(y),
                };
            } else {
                const mouseEvent = e as React.MouseEvent;
                const x = (mouseEvent.clientX - rect.left) * scaleX;
                const y = (mouseEvent.clientY - rect.top) * scaleY;
                return {
                    offsetX: Math.round(x),
                    offsetY: Math.round(y),
                };
            }
        }
        return { offsetX: 0, offsetY: 0 };
    };

    const clearSignature = () => {
        if (ctx && canvasRef.current) {
            ctx.clearRect(
                0,
                0,
                canvasRef.current.width,
                canvasRef.current.height
            );
            if (onChange) {
                lastDrawnValue.current = "";
                hasDrawnSomething.current = false;
                onChange("");
            }
        }
    };

    useEffect(() => {
        const handleGlobalUp = () => {
            if (isDrawing) {
                stopDrawing();
            }
        };

        window.addEventListener("mouseup", handleGlobalUp);
        window.addEventListener("touchend", handleGlobalUp);

        return () => {
            window.removeEventListener("mouseup", handleGlobalUp);
            window.removeEventListener("touchend", handleGlobalUp);
        };
    }, [isDrawing, stopDrawing]);

    return (
        <div
            ref={containerRef}
            className={`signature-canvas-container ${
                disabled ? "opacity-50 cursor-not-allowed" : ""
            }`}
            style={{
                touchAction: isDrawing ? "none" : "manipulation",
                WebkitUserSelect: "none",
                userSelect: "none",
                width: width,
                height: height,
                position: "relative",
                overscrollBehavior: isDrawing ? "none" : "auto",
            }}
        >
            <canvas
                ref={canvasRef}
                width={width}
                height={height}
                className={`border border-gray-300 rounded-lg ${
                    disabled ? "cursor-not-allowed" : "cursor-crosshair"
                } ${
                    hasDrawnSomething.current ? "border-blue-500" : ""
                } ${className} ${isDrawing ? "drawing" : ""}`}
                aria-label="Draw your signature here"
                tabIndex={disabled ? -1 : 0}
                role="textbox"
                aria-multiline="false"
                aria-required={required}
                aria-disabled={disabled}
                aria-describedby="signature-instructions"
                onMouseDown={!isTouchDevice ? startDrawing : undefined}
                onMouseMove={!isTouchDevice ? draw : undefined}
                onMouseUp={!isTouchDevice ? stopDrawing : undefined}
                onMouseLeave={!isTouchDevice ? handleMouseLeave : undefined}
                onTouchStart={(e) => {
                    e.preventDefault();
                    startDrawing(e);
                }}
                onTouchMove={(e) => {
                    e.preventDefault();
                    draw(e);
                }}
                onTouchEnd={(e) => {
                    e.preventDefault();
                    stopDrawing();
                }}
                onKeyDown={(e) => {
                    if (
                        !disabled &&
                        (e.key === "Delete" || e.key === "Backspace")
                    ) {
                        clearSignature();
                    }
                }}
                style={{
                    touchAction: isDrawing ? "none" : "manipulation",
                    WebkitTouchCallout: "none",
                    display: "block",
                    width: "100%",
                    height: "100%",
                }}
            />
            <div id="signature-instructions" className="sr-only">
                {disabled
                    ? "Signature input is disabled"
                    : "Use mouse or touch to draw. Press Delete or Backspace to clear."}
            </div>
            {!hasDrawnSomething.current && !disabled && (
                <div className="text-sm text-gray-500 mt-1">
                    {isTouchDevice
                        ? "Draw your signature using touch"
                        : "Draw your signature using mouse"}
                    . Press Delete to clear.
                </div>
            )}
        </div>
    );
};
